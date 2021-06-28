const fillerText = "---------"
var activeWeapon;

function findWeapon(slot) {
    if (slot.innerHTML !== fillerText) {
        return slot;
    }

    const divs = slot.parentElement.getElementsByTagName("div");
    let loopedCurrent = false;

    for (let i = divs.length - 1; i >= 0; i--) {
        const div = divs[i];

        if (!loopedCurrent) {
            if (div === slot) {
                loopedCurrent = true;
            }

            continue;
        }

        if (div.innerText !== fillerText) {
            return div;
        }
    }
}

function getFillerSlots(div) {
    var filler = [];

    const divs = div.parentElement.getElementsByTagName("div");
    let loopedCurrent = false;

    for (let slot of divs) {
        if (!loopedCurrent) {
            if (slot === div) {
                loopedCurrent = true;
            }

            continue;
        }

        if (slot.innerText !== fillerText) {
            break;
        }

        filler.push(slot);
    }

    return filler;
}

function removeWeapon(div) {
    var weapon = findWeapon(div);
    var filler = getFillerSlots(weapon);

    weapon.innerHTML = "&nbsp;";

    for (let slot of filler) {
        slot.innerHTML = "&nbsp;";
    }
}

function weaponClicked(ev) {
    if (activeWeapon != null) {
        activeWeapon.classList.remove("weapon-active");
    }

    if (activeWeapon == ev.target) {
        activeWeapon = null;
        return;
    }

    activeWeapon = ev.target;
    ev.target.classList.add("weapon-active")
}

function slotClicked(ev) {
    if (activeWeapon == null) {
        return;
    }

    let loopedCurrent = false;
    const divsBelow = [];
    const fillerSlotsNeeded = activeWeapon.dataset.slots - 1;

    for (let div of ev.target.parentElement.getElementsByTagName("div")) {
        if (divsBelow.length >= fillerSlotsNeeded) {
            break;
        }

        if (!loopedCurrent) {
            if (div === ev.target) {
                loopedCurrent = true;
            }

            continue;
        }

        divsBelow.push(div);
    }

    if (divsBelow.length < fillerSlotsNeeded) {
        return;
    }

    if (ev.target.innerText.length > 0) {
        removeWeapon(ev.target)
    }

    ev.target.innerText = activeWeapon.innerText;

    for (let div of divsBelow) {
        removeWeapon(div)
        div.innerText = fillerText;
    }
}

const weapons = document.getElementsByClassName("weapon-list-element");
for (let weapon of weapons) {
    weapon.addEventListener("click", weaponClicked);
}

const slots = document.getElementsByClassName("slot");
for (let slot of slots) {
    slot.addEventListener("click", slotClicked)
}
