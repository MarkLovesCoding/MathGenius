
  import {reformatOperator,createDifficultyText} from './utils.js';
  import { Badges,Operator,Difficulty} from './types.js';

  const badgeImgs:Element[] = Array.from(document.getElementsByClassName("badge-img"))



  
  // Retrieves the user ID
  async function getUserId():Promise<String> {
    try {
      const response:Response = await fetch('/user-id');
      const data = await response.json();
      const userId:string = data.userId;
      // do something with the user ID
      return userId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Retrieves badges from the server
  export async function retrieveBadges():Promise<Badges> {
    try {
      const response = await fetch('/get-badges');
      const data = await response.json();
      const badges:Badges = data.badges;

      return badges;
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
      return {}
    }
  }
  export function getHighestBadge(badges:Badges):[string,string,Difficulty][] {
    let bestBadges:[string,string,Difficulty][] = []

    for (let op in badges) {
      for (let type in badges[op]) {
        let typeMax:number = 0;
        for (let diff in badges[op][type]) {
          let numberDiff = Number(diff)
          if (badges[op][type][diff] == true) {
            typeMax = Math.max(typeMax, numberDiff)
          }
        }

        bestBadges.push([op, type, typeMax.toString() as Difficulty])

      }
    }

    return bestBadges
  }


  // Updates the appearance of badges based on the profile
  export function updateBadgeAppearance(elements:Element[], profile:Badges):void {
    const bestBadges = getHighestBadge(profile)

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
    console.log(bestBadges)
    for (let best of bestBadges) {

      if (Number(best[2]) > 0) {

        for (let element of elements) {
          // TO DO
          //  search through profile.  check if true. if so. designate truthiness (class active) to corresponding type
          // use profile objest to find highest accomplished badge?


          // let operator = element.getAttribute("data-badge-operator")
          let type:string|null = element.getAttribute("data-badge-type");
          let operator:string|null = element.getAttribute("data-badge-operator");
          // console.log("badgeop",operator)
          let level:Element|null = element.nextElementSibling
          // console.log(level)
          if (best[1] == type && best[0] == operator && operator!== null && type!== null) {
            element.classList.add("active")
            if(level) level.textContent = createDifficultyText(best[2])[0]
            // level.textContent == convertNumberToLevel(Number(best[2]))

          }


        }
      }
    }
  }

  // Updates badge status based on type, difficulty, and trueness. Implemented within game client script.
  export async function updateBadgeStatus(type:string, difficulty:string, operator:Operator, bool:boolean):Promise<void> {
    const reformattedOperator:string = reformatOperator(operator)
    try {
      const badgesFromDb:Badges = await retrieveBadges();
      if (bool) {
        badgesFromDb[reformattedOperator][type][difficulty] = true;
        await updateSessionAndDB(badgesFromDb);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Updates session and database with the updated badges
  async function updateSessionAndDB(updatedBadges:Badges):Promise<void> {
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
        body: JSON.stringify({ userId, updatedBadges })
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
  async function initializeBadgeAppearance():Promise<void> {
    const badgesFromDb = await retrieveBadges();
    updateBadgeAppearance(badgeImgs, badgesFromDb);
  }
  window.addEventListener("DOMContentLoaded", initializeBadgeAppearance)
  // Call the initialization function
  // initializeBadgeAppearance();
