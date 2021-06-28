const fillerText = "---------"
// var draggedElement;
var activeWeapon;

// function allowDrop(ev) {
//     ev.preventDefault()
// }
//
// function dragStart(ev) {
//     if (draggedElement != null) {
//         draggedElement.remove();
//     }
//
//     draggedElement = document.createElement("div");
//     draggedElement.id = "drag-image";
//     draggedElement.style.position = "absolute";
//     draggedElement.style.top = "-1000px";
//
//     const nameDiv = document.createElement("div");
//     nameDiv.classList.add("row");
//     nameDiv.id = "drag-image-id";
//     nameDiv.innerText = ev.target.innerText;
//
//     draggedElement.appendChild(nameDiv)
//
//     const slots = ev.target.dataset.slots;
//     for (let i = 0; i < slots; i++) {
//         const slotFiller = document.createElement("div");
//         slotFiller.classList.add("row");
//         slotFiller.innerText = "----------";
//         draggedElement.appendChild(slotFiller)
//     }
//
//     document.body.appendChild(draggedElement);
//
//     ev.dataTransfer.setData("id", ev.target.id);
//     ev.dataTransfer.setDragImage(draggedElement, 0, 0);
// }
//
// function dragDrop(ev) {
//     ev.preventDefault()
//     const id = ev.dataTransfer.getData("id");
//
//     if (!ev.target.classList.contains("empty-slot")) {
//         return;
//     }
//
//     console.log(ev.target.content)
//     console.log(id);
//     ev.target.innerText = document.getElementById(id).innerText;
//     console.log(ev.target.content)
// }
//
// function dragEnd(ev) {
//     if (draggedElement != null) {
//         // draggedElement.remove();
//     }
// }
//
// $(document).mousemove(function(e) {
//     if (draggedElement != null) {
//         $(draggedElement).css({
//             left: e.pageX,
//             top: e.pageY
//         })
//     }
// })
//
// function drag(ev) {
//     if (draggedElement != null) {
//         draggedElement.style.left = ev.clientX;
//         draggedElement.style.top = ev.clientY;
//     }
// }

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
