var menuItems = Array.prototype.slice.call(document.getElementById('menu-items').children);
var data = menuItems.reduce((acc, item) => {
    var result = {};
    if (item.classList.contains('dish-v20')) {
        var img = item.firstChild;
        result.img = img.style.backgroundImage.slice(5, img.style.backgroundImage.length - 2);
		result.title = img.firstChild.innerText;
        var info = item.lastChild;
        result.name = info.firstChild.innerText;
        var flex = Array.prototype.slice.call(info.lastChild.children);
        result.data = flex.map((f) => {
            return {
                amount: f.firstChild.innerText,
                type: f.lastChild.innerText
            };
        });
    } else if (item.classList.contains('summary')) {
        var perDay = item.firstChild.innerText.replace(/\n/gi, ' ');
        var materials = Array.prototype.slice.call(item.lastChild.children);
		result.title = 'Итог';
        result.day = perDay;
        result.materials = materials.map((m) => {return m.innerText.replace(/\n/gi, ' ')});
    }

    acc.push(result);
    return acc;
}, []);
console.log(JSON.stringify(data));
