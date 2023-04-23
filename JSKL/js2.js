//cisteni canvasu po prohre a vyhre
//2. font

//databáze :D
const jidlo = ["mrkev", "jablko", "celer", "mazanec", "chleba", "maso", "jogurt", "krupice", "paprika", "kebab", "cizrna"]
const auto = ["motor", "turbo", "mazda", "nissan", "honda", "brzdy", "audi", "kapota", "auto", "autobus", "letadlo", "vlak"]
const zvire = ["zebra", "orel", "lemur", "tygr", "pes", "sup", "sysel", "krab", "opice", "andulka", "pavouk", "korela"]
const misto = ["les", "vesnice", "domov", "byt", "potok", "hrad", "stan", "most", "kostel", "hotel", "trh", "cirkus"]
let vlastni = []

//definování 1
let slovo = jidlo[Math.floor(Math.random() * jidlo.length)]

const root = document.documentElement

let body = localStorage.getItem("body") || 0
let level = localStorage.getItem("level") || 0
let dalsi = localStorage.getItem("dalsi") || 1
let num = localStorage.getItem("num") || 5

let ctx

//vytváření stránky


vytvor("div", document.body, "", "hlavni-str")
vytvor("div", document.body, "", "kategorie-str")
vytvor("div", document.body, "", "hra-str")
vytvor("div", document.body, "", "nastaveni-str")

const hlavniStr = document.getElementById("hlavni-str")
const kategorieStr = document.getElementById("kategorie-str")
const hraStr = document.getElementById("hra-str")
const nastaveniStr = document.getElementById("nastaveni-str")
document.body.style.backgroundImage = "url('trojuhelnik1.png')";

vytvor("h1", hlavniStr, "Šibenice", "nadpisHL")
vytvor("button", hlavniStr, "Hrát", "tlacitko").onclick = stranka2

vytvor("footer", document.body, "", "foot", "100%")
const footer = document.getElementById("foot")
vytvor("hr", footer, "", "line", "100%")
vytvor("p", footer, "Made with <3 by Niké Janochová", "made-by")
vytvor("p", footer, "Stránka používá lokální úložiště ve webovém prohlížeči", "stranka-pouziva")

const btnHrej = document.getElementById("tlacitko")

function vytvor(element, kam, obsah, id, width, height, hodnota, typ) {
    let generuji = document.createElement(element)
    generuji.textContent = obsah
    generuji.type = typ
    generuji.id = id
    generuji.width = width
    generuji.height = height
    generuji.value = hodnota
    kam.appendChild(generuji)
    return generuji
}


let stranka2Load = false
function stranka2() {
    hlavniStr.style.display = "none"

    if (kategorieStr.style.display == "none") {
        kategorieStr.style.display = "block"
    } else {
        vytvor("h1", kategorieStr, "Šibenice", "nadpisHL")
        vytvor("h2", kategorieStr, "Vyber si kategorii")
        vytvor("button", kategorieStr, "Jídlo", "tlacitko").onclick = function () { generuj(jidlo) }
        vytvor("button", kategorieStr, "Auto", "tlacitko").onclick = function () { generuj(auto) }
        vytvor("button", kategorieStr, "Zvíře", "tlacitko").onclick = function () { generuj(zvire) }
        vytvor("button", kategorieStr, "Místo", "tlacitko").onclick = function () { generuj(misto) }
        vytvor("button", kategorieStr, "Vlastní", "tlacitko").onclick = function () { generuj(vlastni) }
        document.body.style.backgroundImage = "url('trojuhelnik2.png')";
    }
}

//generace random slov z vybranych kategorií

function generuj(kategorie) {
    if (kategorie == vlastni) {
        if (vlastni.length == 0) {
            alert("Musíš nejdříve vlastní kategorii vytvořit")
        } else {
            slovo = vlastni[Math.floor(Math.random() * vlastni.length)]
            stranka3()
            novyBar()
        }
    } else {
        slovo = kategorie[Math.floor(Math.random() * kategorie.length)]
        stranka3()
        novyBar()
    }
    return
}

let levelyElement
let dalsiElement

function stranka3() {
    kategorieStr.style.display = "none"
    

    if (hraStr.style.display == "none") {
        nastaveniStr.style.display = "none"
        hraStr.style.display = "block"
        return
    } else {

        vytvor("h1", hraStr, "Šibenice", "nadpis")
        vytvor("div", hraStr, "", "policka")
        vytvor("br", hraStr)
        vytvor("div", hraStr, "", "profil")
        const profil = document.getElementById("profil")
        vytvor("h2", profil, "Nyní jsi na levelu : " + level, "level")
        vytvor("h2", profil, body + "/" + dalsi, "dalsi")
        vytvor("h2", hraStr, "Zobrazení životů")
        vytvor("canvas", hraStr, "", "my-canvas", "400", "300")
        vytvor("br", hraStr)
        vytvor("button", hraStr, "Nastavení", "tlacitko").onclick = stranka4
        document.body.style.backgroundImage = "url('trojuhelnik3.png')";

        const canv = document.getElementById("my-canvas")
        ctx = canv.getContext("2d")

        levelyElement = document.getElementById("level")
        dalsiElement = document.getElementById("dalsi")
        return
    }
}

function stranka4() {
    hraStr.style.display = "none"

    if (nastaveniStr.style.display == "none") {
        nastaveniStr.style.display = "block"
        return
    } else {
        vytvor("h1", nastaveniStr, "Šibenice", "nadpisHL")
        vytvor("h2", nastaveniStr, "Změň barvu pozadí")
        vytvor("input", nastaveniStr, "", "input-barvaPoz", "", "", "#5e7952", "color")
        vytvor("button", nastaveniStr, "Použít", "tlacitko-inp").onclick = zmenBarvuPoz
        vytvor("br", nastaveniStr)
        vytvor("h2", nastaveniStr, "Změň barvu textu")
        vytvor("input", nastaveniStr, "", "input-barvaText", "", "", "#ffffff", "color")
        vytvor("button", nastaveniStr, "Použít", "tlacitko-inp").onclick = zmenBarvuText
        vytvor("h2", nastaveniStr, "Přidej slovo do kategorie Vlastní")
        vytvor("input", nastaveniStr, "", "input-vlastni", "", "", "", "text").placeholder = " text"
        vytvor("button", nastaveniStr, "Přidat", "tlacitko-inp").onclick = pridejSlovo
        vytvor("br", nastaveniStr)
        vytvor("button", nastaveniStr, "Zpět", "tlacitko").onclick = stranka3
        document.body.style.backgroundImage = "url('trojuhelnik4.png')";
        return
    }
}

function stranka4Show() {
    nastaveniStr.style.display = "block"
}

var zbyvajiciPismena = slovo.length

function novyBar() {

    zbyvajiciPismena = slovo.length

    //vytvoří pole pro slovo
    let pole = ""
    for (let i = 0; i < slovo.length; i++) {
        pole += "<input type='text' id='policko" + i + "' class = 'policko' value='' readonly />"
    }
    //a přidá je na stránku
    document.getElementById("policka").innerHTML = pole
}

let chyba = 0

document.addEventListener("keypress", function (event) {
    var klavesa = event.key.toLowerCase()

    //kontrola jestli pismeno sedí
    let sedi = false;
    for (let i = 0; i < slovo.length; i++) {
        if (slovo[i] === klavesa) {
            if (document.getElementById("policko" + i).value === '') {
                document.getElementById("policko" + i).value = klavesa
                zbyvajiciPismena--
                sedi = true;
            }
        }
    }

    //a pokud ne, pricte se chyba
    if (!sedi) {
        chyba++
        switch (chyba) {
            case 1:
                nakresliSibenici()
                break
            case 2:
                nakresliHlavu()
                break
            case 3:
                nakresliTelo()
                break
            case 4:
                nakresliRuce()
                break
            case 5:
                nakresliNohy()
                alert("Prohrál jsi")
                break
            default:
                alert("Stala se chyba načtěte prosím stránku znovu")
        }
    }


    //kontroluje výhru
    if (zbyvajiciPismena === 0) {
        pripisBod()
        zkontrolujLevel()

        alert("Gratuluji! Uhodl jsi slovo")

        novyBar()
    }
})



//vykreslování šibenice
function nakresliSibenici() {
    ctx.beginPath()
    ctx.moveTo(50, 270)
    ctx.lineTo(330, 270)
    ctx.lineTo(330, 70)
    ctx.lineTo(150, 70)
    ctx.stroke()
}

function nakresliHlavu() {
    //lano
    ctx.beginPath()
    ctx.moveTo(180, 70)
    ctx.lineTo(180, 95)
    ctx.closePath()
    ctx.stroke()

    //kolečko pro hlavu
    ctx.beginPath()
    ctx.arc(180, 120, 25, 0, Math.PI * 2)
    ctx.closePath()
    ctx.stroke()
}

function nakresliTelo() {
    ctx.beginPath()
    ctx.moveTo(180, 145)
    ctx.lineTo(180, 200)
    ctx.closePath()
    ctx.stroke()
}

function nakresliRuce() {
    ctx.beginPath()
    ctx.moveTo(150, 180)
    ctx.lineTo(180, 160)
    ctx.lineTo(210, 180)
    ctx.stroke()
}

function nakresliNohy() {
    ctx.beginPath()
    ctx.moveTo(150, 240)
    ctx.lineTo(180, 200)
    ctx.lineTo(210, 240)
    ctx.stroke()
}



//mění barvu pozadí
const inputBarvaPoz = document.getElementById("input-barvaPoz")
const inputBarvaText = document.getElementById("input-barvaText")
const inputSlovo = document.getElementById("input-vlastni")

function pridejSlovo() {
    let pridej = inputSlovo.value

    vlastni.push(pridej)
}

function zmenBarvuPoz() {
    let barva = inputBarvaPoz.value

    document.body.style.backgroundColor = barva
}

function zmenBarvuText() {
    let barva = inputBarvaText.value

    root.style.setProperty('--mainTextColor', barva);
    root.style.setProperty('--secondaryTextColor', negaceBarvy(barva))
}

function negaceBarvy(barva) {
    // Kontrola jestli je barva v HEX formátu
    if (/^#([0-9A-F]{3}){1,2}$/i.test(barva)) {
        // Přemění HEX na RGB
        let rgb = barva.substring(1).match(/.{1,2}/g);
        rgb = [parseInt(rgb[0], 16), parseInt(rgb[1], 16), parseInt(rgb[2], 16)];

        // Negace RGB
        rgb[0] = 255 - rgb[0];
        rgb[1] = 255 - rgb[1];
        rgb[2] = 255 - rgb[2];

        // Převede zpět na HEX
        barva = "#" + rgb.map(c => ("0" + c.toString(16)).slice(-2)).join("");
        // Kontrola jestli je v RGB / RGBA formátu
    } else if (barva.startsWith("rgb")) {
        // Získá RGB/A hodnoty
        const rgba = barva.match(/(\d+(\.\d+)?%?)/g);

        // Negace RGB
        rgba[0] = 255 - parseInt(rgba[0]);
        rgba[1] = 255 - parseInt(rgba[1]);
        rgba[2] = 255 - parseInt(rgba[2]);

        // Pokud jsou, zkombinuje s alpha hodnotami
        const alpha = rgba.length === 4 ? ", " + rgba[3] : "";
        barva = "rgb(" + rgba.slice(0, 3).join(", ") + alpha + ")";
        // Kontrola jestli je v HSL / HSLA formátu
    } else if (barva.startsWith("hsl")) {
        // Získá HSL/A hodnoty
        const hsla = barva.match(/(\d+(\.\d+)?%?)/g);

        // Negace HSL
        hsla[0] = (hsla[0] + 180) % 360;
        hsla[1] = (100 - parseInt(hsla[1])) + "%";
        hsla[2] = (100 - parseInt(hsla[2])) + "%";

        // Pokud jsou, zkombinuje s alpha hodnotami
        const alpha = hsla.length === 4 ? ", " + hsla[3] : "";
        barva = "hsl(" + hsla.slice(0, 3).join(", ") + alpha + ")";
    }

    return barva;
}


// Body v localStorage

function pripisBod() {
    body++
    localStorage.setItem("body", body)
    dalsiElement.textContent = body + "/" + dalsi
}

function zkontrolujLevel() {
    if (body >= dalsi) {
        levelUp()
        pridejDalsi()
    }
}

function levelUp() {
    level++
    localStorage.setItem("level", level)
    levelyElement.textContent = "Nyní jsi na levelu: " + level
}

function pridejDalsi() {
    dalsi = dalsi + num
    num += 2
    localStorage.setItem("num", num)
    localStorage.setItem("dalsi", dalsi)
    dalsiElement.textContent = body + "/" + dalsi
}