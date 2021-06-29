const fillerText = "---------"
let draggedWeapon;
let draggedElement;
let mouseX;
let mouseY;
let dragIntervalId;

function getWeaponName(weapon) {
    return weapon.querySelector(".weapon-name-label").innerText;
}

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
    const filler = [];

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
    const weapon = findWeapon(div);
    const filler = getFillerSlots(weapon);

    weapon.innerHTML = "&nbsp;";
    weapon.classList.remove(weapon.dataset.typeClass);
    weapon.dataset.typeClass = null;

    for (let slot of filler) {
        slot.innerHTML = "&nbsp;";
        slot.classList.remove(slot.dataset.typeClass);
        slot.dataset.typeClass = null;
    }
}

function setSlot(slot, weapon) {
    let loopedCurrent = false;
    const divsBelow = [];
    const fillerSlotsNeeded = weapon.dataset.slots - 1;

    for (let div of slot.parentElement.getElementsByTagName("div")) {
        if (divsBelow.length >= fillerSlotsNeeded) {
            break;
        }

        if (!loopedCurrent) {
            if (div === slot) {
                loopedCurrent = true;
            }

            continue;
        }

        divsBelow.push(div);
    }

    if (divsBelow.length < fillerSlotsNeeded) {
        return;
    }

    if (slot.innerText.length > 0) {
        removeWeapon(slot)
    }

    slot.innerText = getWeaponName(weapon);
    slot.dataset.typeClass = weapon.dataset.typeClass;
    slot.classList.add(weapon.dataset.typeClass);

    for (let div of divsBelow) {
        removeWeapon(div)
        div.innerText = fillerText;
        div.dataset.typeClass = weapon.dataset.typeClass;
        div.classList.add(weapon.dataset.typeClass);
    }
}

function dragStart(ev) {
    ev.preventDefault();
}

function updatePosition(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;

    if (draggedElement == null) {
        draggedElement = document.createElement("div");
        draggedElement.id = "drag-image";
        draggedElement.style.position = "absolute";
        draggedElement.style.left = mouseX + "px";
        draggedElement.style.top = mouseY + "px";
        draggedElement.classList.add("row");

        const colDiv = document.createElement("div");
        draggedElement.appendChild(colDiv);

        const nameDiv = document.createElement("div");
        nameDiv.classList.add("row");
        nameDiv.classList.add("border")
        nameDiv.classList.add(draggedWeapon.dataset.typeClass)
        nameDiv.classList.add("p-1");
        nameDiv.classList.add("filled-slot");
        nameDiv.classList.add("text-truncate");
        nameDiv.style.backgroundColor = "#171717"
        nameDiv.id = "drag-image-id";
        nameDiv.innerText = getWeaponName(draggedWeapon);

        colDiv.appendChild(nameDiv)

        const filler = draggedWeapon.dataset.slots - 1;
        for (let i = 0; i < filler; i++) {
            const slotFiller = document.createElement("div");
            slotFiller.classList.add("row");
            slotFiller.classList.add("border")
            slotFiller.classList.add("p-1");
            slotFiller.classList.add("slot-filler");
            slotFiller.classList.add(draggedWeapon.dataset.typeClass)
            slotFiller.style.backgroundColor = "#171717"
            slotFiller.innerText = fillerText;
            colDiv.appendChild(slotFiller);
        }

        document.body.appendChild(draggedElement);
    }

    if (dragIntervalId == null) {
        dragIntervalId = setInterval(() => {
            draggedElement.style.position = "absolute";
            draggedElement.style.left = mouseX + "px";
            draggedElement.style.top = mouseY + "px";
            draggedElement.style.zIndex = "1000";
        })
    }
}

function clearDrag() {
    document.removeEventListener("mousemove", updatePosition);

    if (draggedElement != null) {
        for (let hovered of document.elementsFromPoint(mouseX, mouseY)) {
            let filledSlot = hovered.classList.contains("filled-slot");
            let slotFiller = hovered.classList.contains("slot-filler");
            let emptySlot = hovered.classList.contains("empty-slot");

            if (filledSlot || slotFiller || emptySlot) {
                console.log(draggedWeapon)
                setSlot(hovered, draggedWeapon);
            }
        }

        draggedElement.remove();
        draggedElement = null;
        draggedWeapon = null;
    }

    if (dragIntervalId != null) {
        clearInterval(dragIntervalId);
        dragIntervalId = null;
    }
}

for (let weapon of document.getElementsByClassName("weapon-list-element")) {
    weapon.addEventListener("mousedown", () => {
        draggedWeapon = weapon;
        document.addEventListener("mousemove", updatePosition);
    })

    document.addEventListener("mouseup", clearDrag)
}
