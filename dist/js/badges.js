const badgeImgs = document.getElementsByClassName("badge-img");

// Retrieves the user ID
async function getUserId() {
  try {
    const response = await fetch('/user-id');
    const data = await response.json();
    const userId = data.userId;
    // do something with the user ID
    return userId;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Retrieves badges from the server
async function retrieveBadges() {
  try {
    const response = await fetch('/get-badges');
    const data = await response.json();
    const badges = data.badges;
    return badges;
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
}

function getHighestBadge(badges) {
  let bestBadges = [];
  for (let op in badges) {
    console.log("op", op);
    for (let type in badges[op]) {
      console.log("type", type);
      let typeMax = 0;
      for (let diff in badges[op][type]) {
        console.log("diff", diff);
        console.log(badges[op][type][diff]);
        if (badges[op][type][diff] == true) {
          typeMax = Math.max(typeMax, diff);
        }
      }
      bestBadges.push([op, type, typeMax]);
    }
  }
  return bestBadges;
}
function convertNumberToLevel(number) {
  let level;
  switch (number) {
    case 1:
      level = "Easy";
      break;
    case 2:
      level = "Novice";
      break;
    case 3:
      level = "Intermediate";
      break;
    case 4:
      level = "Advanced";
      break;
    case 5:
      level = "Genius!";
      break;
    default:
      level = "-";
      break;
  }
  return level;
}
// Updates the appearance of badges based on the profile
function updateBadgeAppearance(elements, profile) {
  const bestBadges = getHighestBadge(profile);
  const badgeDescriptionLevels = document.getElementsByClassName("badge-description-level");

  // for (let element of elements) {
  //   // TO DO
  //   //  search through profile.  check if true. if so. designate truthiness (class active) to corresponding type
  //   // use profile objest to find highest accomplished badge?
  //   element.classList.add("active");

  //   // let operator = element.getAttribute("data-badge-operator")
  //   let type = element.getAttribute("data-badge-type");
  //   let operator = element.getAttribute("data-badge-operator");

  //   if (profile[operator][type][diff]) {
  //   } else {
  //     element.classList.remove("active");
  //   }
  // }
  for (let best of bestBadges) {
    if (best[2] !== 0) {
      for (let element of elements) {
        // TO DO
        //  search through profile.  check if true. if so. designate truthiness (class active) to corresponding type
        // use profile objest to find highest accomplished badge?

        // let operator = element.getAttribute("data-badge-operator")
        let type = element.getAttribute("data-badge-type");
        let operator = element.getAttribute("data-badge-operator");
        let level = element.nextElementSibling;
        console.log(level);
        if (best[1] == type && best[0] == operator) {
          element.classList.add("active");
          level.textContent = convertNumberToLevel(Number(best[2]));
          // level.textContent == convertNumberToLevel(Number(best[2]))
        }
      }
    }
  }
}

function reformatOperator(operator) {
  let reformattedOperator;
  switch (operator) {
    case "+":
      reformattedOperator = "addition";
      break;
    case "-":
      reformattedOperator = "subtraction";
      break;
    case "x":
      reformattedOperator = "multiplication";
      break;
    default:
      reformattedOperator = "division";
      break;
  }
  return reformattedOperator;
}
// Updates badge status based on type, difficulty, and trueness. Implemented within game client script.
export async function updateBadgeStatus(type, difficulty, operator, bool) {
  const reformattedOperator = reformatOperator(operator);
  try {
    const badgesFromDb = await retrieveBadges();
    if (bool) {
      badgesFromDb[reformattedOperator][type][difficulty] = true;
      await updateSessionAndDB(badgesFromDb);
    }
  } catch (error) {
    console.error(error);
  }
}

// Updates session and database with the updated badges
async function updateSessionAndDB(updatedBadges) {
  try {
    const userId = await getUserId();
    if (!userId) {
      console.error('Failed to retrieve user ID');
      return;
    }
    const response = await fetch(`/update-badges`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        updatedBadges
      })
    });
    if (response.ok) {
      console.log('Badges updated successfully!');
      console.log(updatedBadges);
    } else {
      console.error('Error updating badges!');
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

// Initialize the badge appearance
async function initializeBadgeAppearance() {
  const badgesFromDb = await retrieveBadges();
  updateBadgeAppearance(badgeImgs, badgesFromDb);
}
window.addEventListener("DOMContentLoaded", initializeBadgeAppearance);
// Call the initialization function
// initializeBadgeAppearance();