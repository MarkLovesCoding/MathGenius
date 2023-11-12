var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { reformatOperator, convertNumberToLevel } from './utils.js';
const badgeImgs = Array.from(document.getElementsByClassName("badge-img"));
// Retrieves the user ID
function getUserId() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('/user-id');
            const data = yield response.json();
            const userId = data.userId;
            // do something with the user ID
            return userId;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
// Retrieves badges from the server
export function retrieveBadges() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('/get-badges');
            const data = yield response.json();
            const badges = data.badges;
            console.log("bages", badges);
            return badges;
        }
        catch (error) {
            console.error(error);
            // Handle the error appropriately
            return {};
        }
    });
}
export function getHighestBadge(badges) {
    let bestBadges = [];
    for (let op in badges) {
        for (let type in badges[op]) {
            let typeMax = 0;
            for (let diff in badges[op][type]) {
                let numberDiff = Number(diff);
                if (badges[op][type][diff] == true) {
                    typeMax = Math.max(typeMax, numberDiff);
                }
            }
            bestBadges.push([op, type, String(typeMax)]);
        }
    }
    return bestBadges;
}
// Updates the appearance of badges based on the profile
export function updateBadgeAppearance(elements, profile) {
    const bestBadges = getHighestBadge(profile);
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
    console.log(bestBadges);
    for (let best of bestBadges) {
        if (Number(best[2]) > 0) {
            for (let element of elements) {
                // TO DO
                //  search through profile.  check if true. if so. designate truthiness (class active) to corresponding type
                // use profile objest to find highest accomplished badge?
                // let operator = element.getAttribute("data-badge-operator")
                let type = element.getAttribute("data-badge-type");
                let operator = element.getAttribute("data-badge-operator");
                // console.log("badgeop",operator)
                let level = element.nextElementSibling;
                // console.log(level)
                if (best[1] == type && best[0] == operator && operator !== null && type !== null) {
                    console.log("best[1]", best[1], "best[0]", best[0], "type", type, "op", operator);
                    element.classList.add("active");
                    if (level)
                        level.textContent = convertNumberToLevel(Number(best[2]));
                    // level.textContent == convertNumberToLevel(Number(best[2]))
                }
            }
        }
    }
}
// Updates badge status based on type, difficulty, and trueness. Implemented within game client script.
export function updateBadgeStatus(type, difficulty, operator, bool) {
    return __awaiter(this, void 0, void 0, function* () {
        const reformattedOperator = reformatOperator(operator);
        try {
            const badgesFromDb = yield retrieveBadges();
            console.log('badges from DB', badgesFromDb);
            if (bool) {
                console.log("type:", type);
                badgesFromDb[reformattedOperator][type][difficulty] = true;
                yield updateSessionAndDB(badgesFromDb);
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
// Updates session and database with the updated badges
function updateSessionAndDB(updatedBadges) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = yield getUserId();
            if (!userId) {
                console.error('Failed to retrieve user ID');
                return;
            }
            const response = yield fetch(`/update-badges`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, updatedBadges })
            });
            if (response.ok) {
                console.log('Badges updated successfully!');
                console.log(updatedBadges);
            }
            else {
                console.error('Error updating badges!');
            }
        }
        catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    });
}
// Initialize the badge appearance
function initializeBadgeAppearance() {
    return __awaiter(this, void 0, void 0, function* () {
        const badgesFromDb = yield retrieveBadges();
        updateBadgeAppearance(badgeImgs, badgesFromDb);
    });
}
window.addEventListener("DOMContentLoaded", initializeBadgeAppearance);
// Call the initialization function
// initializeBadgeAppearance();
