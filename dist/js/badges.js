import{reformatOperator,convertNumberToLevel}from"./utils.js";const badgeImgs=Array.from(document.getElementsByClassName("badge-img"));async function getUserId(){try{return(await(await fetch("/user-id")).json()).userId}catch(e){throw console.error(e),e}}async function retrieveBadges(){try{return(await(await fetch("/get-badges")).json()).badges}catch(e){return console.error(e),{}}}function getHighestBadge(a){var t,r=[];for(t in a)for(var o in a[t]){let e=0;for(var n in a[t][o]){var s=Number(n);1==a[t][o][n]&&(e=Math.max(e,s))}r.push([t,o,String(e)])}return r}function updateBadgeAppearance(e,a){var t,a=getHighestBadge(a);console.log(a);for(t of a)if(0<Number(t[2]))for(var r of e){var o=r.getAttribute("data-badge-type"),n=r.getAttribute("data-badge-operator"),s=r.nextElementSibling;t[1]==o&&t[0]==n&&null!==n&&null!==o&&(r.classList.add("active"),s)&&(s.textContent=convertNumberToLevel(Number(t[2])))}}async function updateBadgeStatus(e,a,t,r){t=reformatOperator(t);try{var o=await retrieveBadges();r&&(o[t][e][a]=!0,await updateSessionAndDB(o))}catch(e){console.error(e)}}async function updateSessionAndDB(e){try{var a=await getUserId();a?(await fetch("/update-badges",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:a,updatedBadges:e})})).ok?(console.log("Badges updated successfully!"),console.log(e)):console.error("Error updating badges!"):console.error("Failed to retrieve user ID")}catch(e){console.error("There was a problem with the fetch operation:",e)}}async function initializeBadgeAppearance(){var e=await retrieveBadges();updateBadgeAppearance(badgeImgs,e)}window.addEventListener("DOMContentLoaded",initializeBadgeAppearance);export{retrieveBadges,getHighestBadge,updateBadgeAppearance,updateBadgeStatus};