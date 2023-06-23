//-JSKL NIKÉ JANOCHOVÁ-


//definování
const root = document.documentElement
let kategorieProm
let slovo
let body = localStorage.getItem("body") || 0
let level = localStorage.getItem("level") || 1
let dalsi = localStorage.getItem("dalsiLS") || 1
let barvaPozadiProm = localStorage.getItem("barvaPozadi") || "#5e7952"
let barvaTextProm = localStorage.getItem("barvaText") || "#ffffff"
let charakter = localStorage.getItem("charakter") || "../obr/charakter1.png"
let posledniStr = localStorage.getItem("poslStr")
let nyniStr = localStorage.getItem("nyniStr")

let ctx
let canv
let levelyElement
let dalsiElement
let chyba = 0
let inputVlastni
let stranka1Nacteno = false
let strankaInfoNacteno = false
let stranka2Nacteno = false
let stranka3Nacteno = false
let strankaHraOtevreno = false
let stranka4Nacteno = false
let hudbaHraje = false
let zbyvajiciPismena
let akaAlert
let klavesnice
let pouzite
let klavesa
let vetyHotovo = false
let text
let text2
let tlacitkoOk
let tlacitka
let obrazek
let charakterZmena
let audio = new Audio('../hudba/miyagisama-monopoly-money-production-music-luxurious-elegant-9808.mp3')


//vlastni
let vlastni = localStorage.getItem("vlastni")
if (!vlastni) {
    vlastni = []
} else {
    vlastni = JSON.parse(vlastni)
}


//slova
const jidlo = ["mrkev", "jablko", "celer", "mazanec", "chleba", "maso", "jogurt", "krupice", "paprika", "kebab", "cizrna", "zelenina", "med", "ovoce", "dezert", "byliny", "houska", "mouka", "brambory", "led"]
const auto = ["motor", "turbo", "mazda", "nissan", "honda", "brzdy", "audi", "kapota", "auto", "autobus", "letadlo", "vlak", "silnice", "kolo", "rychlost", "volant", "pneumatiky", "nitro", "nismo"]
const zvire = ["zebra", "orel", "lemur", "tygr", "pes", "sup", "sysel", "krab", "opice", "andulka", "pavouk", "korela", "hmyz", "slon", "had", "ryba", "lachtan", "ovce", "prase", "tur", "velbloud", "blecha"]
const misto = ["les", "vesnice", "domov", "byt", "potok", "hrad", "stan", "most", "kostel", "hotel", "trh", "cirkus", "park", "hora", "kino", "klub", "restaurace", "chata", "aquapark", "farma", "nemocnice"]
const vety = ["v krabici byl ukryt poklad", "dva kluci se prali o krabici", "v pokoji je televize", "do pracovny by se hodila televize", "v lednu jsme si vzali dovolenou", "policie lapila padoucha", "v listopadu byla prozrazena jejich organizace", "historie se opakuje", "sleva byla deset procent", "on mi prozradil tyto informace", "dal mi data na disk", "na projektu pracujeme skoro dvacet let", "ceny nelze nechat mimo pozornost", "kapr plaval opravdu rychle", "petr zase koupil hrocha", "na trhu jsme prodali prase", "opice nemohly odeslat telegram", "velbloud si sedl vedle cesty", "nejsem si jist jak napsat adresu", "lucie si vybrala z menu", "pavel pravil oper mi triko", "neprodal bych to subaru", "je mi to jedno"]

//abeceda
const abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

//použité písmena
let pismena = []

//formování stránky
vytvor("div", document.body, "", "hlavni-str")
vytvor("div", document.body, "", "kategorie-str")
vytvor("div", document.body, "", "hra-str")
vytvor("div", document.body, "", "nastaveni-str")
vytvor("div", document.body, "", "info-str")

const hlavniStr = document.getElementById("hlavni-str")
const kategorieStr = document.getElementById("kategorie-str")
const hraStr = document.getElementById("hra-str")
const nastaveniStr = document.getElementById("nastaveni-str")
const infoStr = document.getElementById("info-str")


//zapnutí
switch (nyniStr) {
    case "stranka1":
        stranka1()
        break
    case "strankaInfo":
        strankaInfo()
        break
    case "stranka2":
        stranka2()
        break
    case "stranka3":
        stranka2()
        break
    case "stranka4":
        if (posledniStr == "stranka1") {
            stranka4()
        } else {
            stranka2()
        }
        break
    default:
        stranka1()
}

footer()
zmenBarvu(0)


window.addEventListener('beforeunload', function () {
    audio.pause()
})


//vytváření stránek
function footer() {
    vytvor("footer", document.body, "", "foot", "100%")
    const footer = document.getElementById("foot")
    vytvor("p", footer, "Made with <3 by Niké Janochová", "made-by")
}

function stranka1() {
    definujStr(2, "stranka1")

    if (strankaInfoNacteno) { infoStr.style.display = "none" }
    if (stranka2Nacteno) { kategorieStr.style.display = "none" }
    if (stranka4Nacteno) { nastaveniStr.style.display = "none" }

    switch (stranka1Nacteno) {
        case true:
            hlavniStr.style.display = "block"
            break
        case false:
            stranka1Nacteno = true
            vytvor("h1", hlavniStr, "Šibenice", "nadpisHL")
            vytvor("button", hlavniStr, "Hrát", "tlacitko").onclick = stranka2
            vytvor("br", hlavniStr)
            vytvor("button", hlavniStr, "Info", "tlacitko").onclick = strankaInfo
            vytvor("br", hlavniStr)
            vytvor("button", hlavniStr, "Nastavení", "tlacitko").onclick = stranka4
    }
    document.body.style.backgroundImage = "url('../obr/trojuhelnik1.png')"
}

function strankaInfo() {
    definujStr(1, "strankaInfo")

    if (stranka1Nacteno) { hlavniStr.style.display = "none" }

    switch (strankaInfoNacteno) {
        case true:
            infoStr.style.display = "block"
            break
        case false:
            strankaInfoNacteno = true
            vytvor("button", infoStr, "zpět", "tlacitkoBack").onclick = stranka1
            vytvor("h1", infoStr, "Šibenice", "nadpis")
            vytvor("h2", infoStr, "Jak hrát", "infoH2")
            vytvor("p", infoStr, "Klikněte na tlačítko Hrát, poté si vyberte kategorii slov ve které chcete hádat. Na klávesnici stiskněte písmeno, pokud je Vámi vybrané písmeno obsaženo ve slově, zobrazí se v jednom z polí. Pokud Vámi vybrané písmeno ve slově není, zobrazí se kus šibenice v rámečku. Jako hráč máte 10 životů, tj. 9 tolerovaných špatných odpovědí dokud s tou poslední devátou neprohrajete. Každá špatná odpověď nakreslí 1 část šibenice.", "textInfo")
            vytvor("br", infoStr)
            vytvor("h2", infoStr, "Nastavení", "infoH2")
            vytvor("p", infoStr, "V nastavení si můžete změnit barvu pozadí a barvu textu, buď sami podle svého vkusu, nebo si můžete vybrat z přednastavených barev. V nastavení se také dají přidat slova do kategorie Vlastní. Vše se lokálně ukládá a tím pádem to zůstává po opětovném načtení / otevření stránky. Jako další možnost tam lze vypínat a zapínat hudbu v pozadí. Skladba, pokud je zapnutá, se automaticky loopuje (hraje stále dokola). V nastavení dále můžete smazat slova z kategorie Vlastní a svůj celkový progress (postup ve hře - levely, body), ale pozor - co se jednou smaže už nelze vrátit.", "textInfo")
            vytvor("br", infoStr)
            vytvor("h2", infoStr, "Kategorie Vlastní", "infoH2")
            vytvor("p", infoStr, "Slova se do kategorie Vlastní přidávají v nastavení, které naleznete jak na hlavní stránce, tak pod hrou ve všech kategoriích. Za kategorii Vlastní se nepřičítají body do levelu. Kategorie Vlastní se ukládá s obnovením stránky. Kategorie Vlastní se smaže oběma funkcemi na mazání dat z lokálního úložiště v nastavení. Po smazání nelze obnovit.", "textInfo")
            vytvor("br", infoStr)
            vytvor("h2", infoStr, "Reload stránky", "infoH2")
            vytvor("p", infoStr, "Stránka se po reloadu, opětovném načtení, otevře na stránce, na které se zavřela, KROMĚ: stránky s hrou a stránky s nastavením, POKUD jste na ní přišli přes stránku s hrou. V tom případě se vám Šibenice otevře na stránce s výběrem kategorie. Po reloadu ZŮSTÁVÁ: 1. profil hráče - profilový obrázek, body a level, 2. nastavení vzhledu - použitá barva textu a barva pozadí včetně těch z přednastavených. Po reloadu NEZŮSTÁVÁ: 1. zapnutá hudba, 2. nepoužitá barva pozadí a textu.", "textInfo")
            vytvor("br", infoStr)
            vytvor("h2", infoStr, "Lokální úložiště", "infoH2")
            vytvor("p", infoStr, "Stránka používá lokální úložiště ve webovém prohlížeči. To znamená, že jak na jiném počítači, tak i na stejém počítači, ale v jiném prohlížeči nebudete mít uloženou kategorii Vlastní, svůj progress, ani vzhledovou úpravu.", "textInfo")
    }
    document.body.style.backgroundImage = "url('../obr/trojuhelnik3.png')";
}

function stranka2() {
    definujStr(1, "stranka2")

    strankaHraOtevreno = false

    if (stranka3Nacteno) { hraStr.style.display = "none" }
    if (stranka1Nacteno) { hlavniStr.style.display = "none" }

    switch (stranka2Nacteno) {
        case true:
            kategorieStr.style.display = "block"
            break
        case false:
            stranka2Nacteno = true
            vytvor("h1", kategorieStr, "Šibenice", "nadpisHL")
            vytvor("h2", kategorieStr, "Vyber si kategorii")
            vytvor("button", kategorieStr, "Jídlo", "tlacitko").onclick = function () { generuj(jidlo) }
            vytvor("button", kategorieStr, "Auto", "tlacitko").onclick = function () { generuj(auto) }
            vytvor("button", kategorieStr, "Zvíře", "tlacitko").onclick = function () { generuj(zvire) }
            vytvor("button", kategorieStr, "Místo", "tlacitko").onclick = function () { generuj(misto) }
            vytvor("button", kategorieStr, "Vlastní", "tlacitko").onclick = function () { generuj(vlastni) }
            vytvor("button", kategorieStr, "zpět", "tlacitkoBack").onclick = stranka1
    }
    if (!vetyHotovo && level >= 10) {
        vetyHotovo = true
        vytvor("button", kategorieStr, "Věty", "tlacitko").onclick = function () { generuj(vety) }
    }
    document.body.style.backgroundImage = "url('../obr/trojuhelnik2.png')";
}

function stranka3() {
    definujStr(2, "stranka3")

    strankaHraOtevreno = true

    if (stranka4Nacteno) { nastaveniStr.style.display = "none" }
    if (stranka2Nacteno) { kategorieStr.style.display = "none" }

    switch (stranka3Nacteno) {
        case true:
            hraStr.style.display = "block"
            break
        case false:
            stranka3Nacteno = true
            vytvor("button", hraStr, "zpět", "tlacitkoBack").onclick = stranka2zpet
            vytvor("div", hraStr, "", "profil")
            const profil = document.getElementById("profil")
            vytvor("img", profil, "", "obrazek", "70", "70", "", "", charakter)
            vytvor("h2", profil, "Nyní jsi na levelu : " + level, "level")
            vytvor("h2", profil, body + "/" + dalsi, "dalsiProf")
            vytvor("h1", hraStr, "Šibenice", "nadpis")
            vytvor("div", hraStr, "", "policka")
            vytvor("h2", hraStr, "Klávesnice")
            vytvor("div", hraStr, "", "klavesnice")
            klavesnice = document.getElementById("klavesnice")
            vytvorAbc(klavesnice)
            vytvor("h2", hraStr, "Použitá písmena")
            vytvor("p", hraStr, "začněte kliknutím na klávesnici", "pouzite")
            pouzite = document.getElementById("pouzite")
            vytvor("h2", hraStr, "Zobrazení životů")
            vytvor("canvas", hraStr, "", "my-canvas", "400", "300")
            vytvor("br", hraStr)
            vytvor("button", hraStr, "Nastavení", "tlacitko").onclick = stranka4
            vytvor("div", hraStr, "", "mezera")

            vytvor("div", hraStr, "", "akaalert")
            akaAlert = document.getElementById("akaalert")
            akaAlert.style.display = "none"

            canv = document.getElementById("my-canvas")
            ctx = canv.getContext("2d")
            zmenBarvuCtx(barvaTextProm)
            ctx.lineWidth = 5

            levelyElement = document.getElementById("level")
            dalsiElement = document.getElementById("dalsiProf")
    }
    document.body.style.backgroundImage = "url('../obr/trojuhelnik3.png')";
}

function stranka4() {
    definujStr(1, "stranka4")

    strankaHraOtevreno = false
    if (stranka3Nacteno) { hraStr.style.display = "none" }
    if (stranka1Nacteno) { hlavniStr.style.display = "none" }

    switch (stranka4Nacteno) {
        case true:
            nastaveniStr.style.display = "block"
            break
        case false:
            stranka4Nacteno = true
            vytvor("h1", nastaveniStr, "Šibenice", "nadpis")
            vytvor("h2", nastaveniStr, "Změň barvu pozadí")
            vytvor("input", nastaveniStr, "", "input-barvaPoz", "", "", "", "color")
            vytvor("button", nastaveniStr, "Použít", "tlacitko-inp").onclick = function () { zmenBarvu(1) }
            vytvor("h2", nastaveniStr, "Změň barvu textu")
            vytvor("input", nastaveniStr, "", "input-barvaText", "", "", "", "color")
            vytvor("button", nastaveniStr, "Použít", "tlacitko-inp").onclick = function () { zmenBarvu(2) }
            vytvor("h2", nastaveniStr, "Přednastavené barvy")
            vytvor("span", nastaveniStr, "", "kolecko1").onclick = function () { zmenBarvu(3, "#5e7952", "#ffffff") }
            vytvor("span", nastaveniStr, "", "kolecko5").onclick = function () { zmenBarvu(3, "#c9c5c5", "#26576e") }
            vytvor("span", nastaveniStr, "", "kolecko3").onclick = function () { zmenBarvu(3, "#b68681", "#000000") }
            vytvor("span", nastaveniStr, "", "kolecko4").onclick = function () { zmenBarvu(3, "#713e75", "#ffd1e3") }
            vytvor("span", nastaveniStr, "", "kolecko2").onclick = function () { zmenBarvu(3, "#000000", "#ffffff") }
            vytvor("h2", nastaveniStr, "Hudba")
            vytvor("button", nastaveniStr, "zapnout", "on-off").onclick = hudba
            vytvor("h2", nastaveniStr, "Změň profilový obrázek")
            vytvor("img", nastaveniStr, "", "obrazky", "70", "70", "", "", "../obr/charakter1.png").onclick = function () { zmenPostavu(1) }
            vytvor("img", nastaveniStr, "", "obrazky", "70", "70", "", "", "../obr/charakter2.png").onclick = function () { zmenPostavu(2) }
            vytvor("img", nastaveniStr, "", "obrazky", "70", "70", "", "", "../obr/charakter3.png").onclick = function () { zmenPostavu(3) }
            vytvor("img", nastaveniStr, "", "obrazky", "70", "70", "", "", "../obr/charakter4.png").onclick = function () { zmenPostavu(4) }
            vytvor("img", nastaveniStr, "", "obrazky", "70", "70", "", "", "../obr/charakter5.png").onclick = function () { zmenPostavu(5) }
            vytvor("img", nastaveniStr, "", "obrazky", "70", "70", "", "", "../obr/charakter6.png").onclick = function () { zmenPostavu(6) }
            vytvor("h2", nastaveniStr, "Přidej slovo do Vlastní")
            vytvor("input", nastaveniStr, "", "input-vlastni", "", "", "", "text").placeholder = "slovo"
            inputVlastni = document.getElementById("input-vlastni")
            vytvor("button", nastaveniStr, "Přidat", "tlacitko-inp").onclick = pridejSlovo
            vytvor("h2", nastaveniStr, "Smaž slova z Vlastní")
            vytvor("p", nastaveniStr, "Tato akce je nenávratná.", "textInfo")
            vytvor("button", nastaveniStr, "Smazat", "tlacitko-inp").onclick = function () { localStorage.removeItem("vlastni") }
            vytvor("h2", nastaveniStr, "Smaž soubory z lokálního úložiště")
            vytvor("p", nastaveniStr, "Tato akce je nenávratná. Smaže level, body a slova z kategorie Vlastní.", "textInfo")
            vytvor("button", nastaveniStr, "Smazat", "tlacitko-inp").onclick = vycistitLS
            vytvor("button", nastaveniStr, "zpět", "tlacitkoBack").onclick = zpetNaStr
    }
    document.body.style.backgroundImage = "url('../obr/trojuhelnik4.png')";
}


//funkce stránek
function vytvor(element, kam, obsah, id, width, height, hodnota, typ, zdroj) {
    let generuji = document.createElement(element)
    generuji.textContent = obsah
    generuji.type = typ
    generuji.id = id
    generuji.width = width
    generuji.height = height
    generuji.value = hodnota
    generuji.src = zdroj
    kam.appendChild(generuji)
    return generuji
}

function definujStr(moznost, stranka) {
    switch (moznost) {
        case 1:
            nyniStr = stranka
            localStorage.setItem("nyniStr", nyniStr)
            break
        case 2:
            posledniStr = stranka
            localStorage.setItem("poslStr", posledniStr)
            nyniStr = stranka
            localStorage.setItem("nyniStr", nyniStr)
    }
}

function zpetNaStr() {
    switch (posledniStr) {
        case "stranka1":
            stranka1()
            break
        case "stranka3":
            stranka3()
    }
}

//funkce stránky hra
function vytvorAbc(kam) {
    for (let i = 0; i < abc.length; i++) {
        vytvor("button", kam, abc[i], "Klklavesa")
    }
}

//generace random slova z vybrané kategorie
function generuj(kategorie) {
    kategorieProm = kategorie

    switch (kategorieProm) {
        case vety:
        case jidlo:
        case auto:
        case zvire:
        case misto:
            slovo = kategorieProm[Math.floor(Math.random() * kategorieProm.length)]
            stranka3()
            vymazSibenici()
            novyBar()
            break
        case vlastni:
            if (vlastni.length == 0) {
                alert("Musíš nejdříve přidat slova v nastavení.")
            } else {
                slovo = vlastni[Math.floor(Math.random() * vlastni.length)]
                stranka3()
                vymazSibenici()
                novyBar()
            }
    }
}

function novyBar() {
    zbyvajiciPismena = slovo.length

    //vytvoří pole pro slovo
    let pole = ""
    for (let i = 0; i < slovo.length; i++) {
        pole += "<input type='text' id='policko" + i + "' class = 'policko' value='' readonly />"
    }
    //a přidá je na stránku
    document.getElementById("policka").innerHTML = pole

    //odstraní políčka s mezerami
    for (let i = 0; i < slovo.length; i++) {
        if (slovo[i] === " ") {
            let policko = document.getElementById("policko" + i)

            policko.classList.add("mezera")
            zbyvajiciPismena--
        }
    }
}

function stranka2zpet(){
    pismena = []
    pouzite.textContent = "začněte kliknutím na klávesnici"
    stranka2()
}

//hádání
//písmena - fyzická klávesnice
document.addEventListener("keypress", function (event) {
    if (strankaHraOtevreno) {
        klavesa = event.key.toLowerCase()

        pismenoZjisti()
    }
})

//písmena - digitální klávesnice
document.addEventListener("click", function (event) {
    if (strankaHraOtevreno) {
        const tlacitkoKl = event.target
        if (tlacitkoKl.id == "Klklavesa") {
            klavesa = tlacitkoKl.textContent.toLowerCase()

            pismenoZjisti()
        }
    }
})

function pismenoZjisti() {
    let pismenoBylo = false

    if (pismena.length !== 0) {
        for (i = 0; i < pismena.length; i++) {
            if (pismena[i] == klavesa) {
                pismenoBylo = true
            }
        }
    }

    if (!pismenoBylo) {
        hadani()
        pismena.push(klavesa)
        pouzite.textContent = pismena
    }
}

//kontrola jestli písmeno sedí
function hadani() {
    let sedi = false;
    if (klavesa !== " ") {
        for (let i = 0; i < slovo.length; i++) {
            if (slovo[i] === klavesa) { //pokud písmeno sedí:
                if (document.getElementById("policko" + i).value === '') {
                    document.getElementById("policko" + i).value = klavesa
                    sedi = true;
                    zbyvajiciPismena--
                    kontrolujVyhru()
                }
            }
        }
    }


    //pokud nesedí přičte se chyba
    if (!sedi) {
        chyba++
        switch (chyba) {
            case 1:
                nakresliPodlahu()
                break
            case 2:
                nakresliKul()
                break
            case 3:
                nakresliTyc()
                break
            case 4:
                nakresliPodperu()
                break
            case 5:
                nakresliLano()
                break
            case 6:
                nakresliHlavu()
                break
            case 7:
                nakresliKrk()
                break
            case 8:
                nakresliTelo()
                break
            case 9:
                nakresliRuce()
                break
            case 10:
                nakresliNohy()
                upozorni("ne")
                break
        }
    }
}

//kontroluje výhru
function kontrolujVyhru() {
    if (zbyvajiciPismena === 0) {
        if (kategorieProm == vety) {
            for (i = 0; i < 3; i++) {
                pripisBod()
                zkontrolujLevel()
            }
        } else if (kategorieProm != vlastni) {
            pripisBod()
            zkontrolujLevel()
        }

        upozorni("ano")
    }
}

//body, levely a další potřebný počet bodů k novému levelu v profilu
function pripisBod() {
    body++
    localStorage.setItem("body", body)
    dalsiElement.textContent = body + "/" + dalsi
    zkontrolujLevel()
}

function zkontrolujLevel() {
    if (body >= dalsi) {
        pridejDalsi()
        levelUp()
    }
}

function levelUp() {
    level++
    localStorage.setItem("level", level)
    levelyElement.textContent = "Nyní jsi na levelu: " + level
}

function pridejDalsi() {
    dalsi = parseInt(dalsi) + parseInt(parseInt(level) * 2)
    localStorage.setItem("dalsiLS", dalsi)
    dalsiElement.textContent = body + "/" + dalsi
}

//vytváří vyskakovací okno při výhře a prohře
function upozorni(uhodl) {
    tlacitka = hraStr.querySelectorAll("button:not(#OK")
    strankaHraOtevreno = false

    switch (uhodl) {
        case "ano":
            vytvor("p", akaAlert, "Gratuluji! Uhodl jsi.", "text")
            akaAlert.style.display = "block"
            break
        case "ne":
            vytvor("p", akaAlert, "Prohrál jsi.", "text")
            vytvor("p", akaAlert, "Hádané slovo bylo: " + slovo, "text2")
            akaAlert.style.display = "block"
    }
    vytvor("button", akaAlert, "OK", "OK").onclick = ok

    text = document.getElementById("text")
    text2 = document.getElementById("text2")
    tlacitkoOk = document.getElementById("OK")

    tlacitka.forEach(function (button) {
        button.disabled = true
    })
}

//maže současný pokus a vytváří nové slovo
function ok() {
    akaAlert.removeChild(text)
    if (text2) { akaAlert.removeChild(text2) }
    akaAlert.removeChild(tlacitkoOk)

    vymazSibenici()
    pismena = []
    pouzite.textContent = "začněte kliknutím na klávesnici"
    slovo = kategorieProm[Math.floor(Math.random() * kategorieProm.length)]
    novyBar()

    tlacitka.forEach(function (button) {
        button.disabled = false
    })
    strankaHraOtevreno = true
}


//funkce vykreslování šibenice
function vymazSibenici() {
    ctx.clearRect(0, 0, canv.width, canv.height)
    chyba = 0
}

function nakresliPodlahu() {
    ctx.beginPath()
    ctx.moveTo(50, 270)
    ctx.lineTo(350, 270)
    ctx.stroke()
}

function nakresliKul() {
    ctx.beginPath()
    ctx.moveTo(330, 270)
    ctx.lineTo(330, 70)
    ctx.stroke()
}

function nakresliTyc() {
    ctx.beginPath()
    ctx.moveTo(333, 70)
    ctx.lineTo(150, 70)
    ctx.stroke()
}

function nakresliPodperu() {
    ctx.beginPath()
    ctx.moveTo(250, 70)
    ctx.lineTo(330, 160)
    ctx.stroke()
}

function nakresliLano() {
    ctx.beginPath()
    ctx.moveTo(180, 70)
    ctx.lineTo(180, 95)
    ctx.stroke()
}

function nakresliHlavu() {
    ctx.beginPath()
    ctx.arc(180, 120, 25, 0, Math.PI * 2)
    ctx.closePath()
    ctx.stroke()
}

function nakresliKrk() {
    ctx.beginPath()
    ctx.moveTo(180, 145)
    ctx.lineTo(180, 165)
    ctx.stroke()
}

function nakresliTelo() {
    ctx.beginPath()
    ctx.moveTo(180, 145)
    ctx.lineTo(180, 200)
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

//funkce stránky nastavení
//barva
function zmenBarvu(moznost, barvaP, barvaT) {
    let meziPozadi
    let meziText

    //vybírá, co se mění
    switch (moznost) {
        case 0: //nacteni z LS
            console.log("Načtení barvy z local storage")
            break
        case 1: //pouze barva pozadi
            meziPozadi = document.getElementById("input-barvaPoz")
            barvaPozadiProm = meziPozadi.value
            break
        case 2: //pouze barva textu
            meziText = document.getElementById("input-barvaText")
            barvaTextProm = meziText.value
            barvaSib()
            break
        case 3: //oboji (prednastavene barvy)
            barvaTextProm = barvaT
            barvaPozadiProm = barvaP
            barvaSib()
            break
    }

    //mění
    document.body.style.backgroundColor = barvaPozadiProm
    localStorage.setItem("barvaPozadi", barvaPozadiProm)

    root.style.setProperty('--mainTextColor', barvaTextProm)
    localStorage.setItem("barvaText", barvaTextProm)

    root.style.setProperty('--secondaryTextColor', negaceBarvy(barvaTextProm))

    //překresluje chyby zaznamenané v šibenici do nové barvy
    function barvaSib() {
        if (barvaTextProm != undefined) {
            if (chyba != 0) {
                ctx.clearRect(0, 0, canv.width, canv.height)
            }

            if (stranka3Nacteno) {
                zmenBarvuCtx(barvaTextProm)

                switch (chyba) {
                    case 9:
                        nakresliRuce()
                    case 8:
                        nakresliTelo()
                    case 7:
                        nakresliKrk()
                    case 6:
                        nakresliHlavu()
                    case 5:
                        nakresliLano()
                    case 4:
                        nakresliPodperu()
                    case 3:
                        nakresliTyc()
                    case 2:
                        nakresliKul()
                    case 1:
                        nakresliPodlahu()
                    case 0:
                }
            }
        }
    }
}

function zmenBarvuCtx(barvaTextProm) {
    ctx.strokeStyle = barvaTextProm
}

function negaceBarvy(barva) {
    //kontrola jestli je barva v HEX formátu
    if (/^#([0-9A-F]{3}){1,2}$/i.test(barva)) {
        //přemění HEX na RGB
        let rgb = barva.substring(1).match(/.{1,2}/g)
        rgb = [parseInt(rgb[0], 16), parseInt(rgb[1], 16), parseInt(rgb[2], 16)]

        //negace RGB
        rgb[0] = 255 - rgb[0]
        rgb[1] = 255 - rgb[1]
        rgb[2] = 255 - rgb[2]

        //definuje barvu jako rgb
        barva = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")"

        //vrátí barvu
        console.log("Negovaná barva: " + barva)
        return barva

        //pokud barva není v HEX formátu:
    } else {
        alert("Váš prohlížeč nepodporuje tuto funkci. Otevřete si hru v jiném prohlížeči, nebo tato funkce nebude fungovat.")
    }
}

//pozastavuje a pouští hudbu
function hudba() {
    switch (hudbaHraje) {
        case false:
            audio.loop = true
            audio.play()
            document.getElementById("on-off").textContent = "Vypnout"
            hudbaHraje = true
            break
        case true:
            audio.pause()
            document.getElementById("on-off").textContent = "Zapnout"
            hudbaHraje = false
    }
}

//profilový obrázek
function zmenPostavu(cislo) {
    switch (cislo) {
        case 1:
            charakter = "../obr/charakter1.png"
            break
        case 2:
            charakter = "../obr/charakter2.png"
            break
        case 3:
            charakter = "../obr/charakter3.png"
            break
        case 4:
            charakter = "../obr/charakter4.png"
            break
        case 5:
            charakter = "../obr/charakter5.png"
            break
        case 6:
            charakter = "../obr/charakter6.png"
    }
    localStorage.setItem("charakter", charakter)
    location.reload()
}

//přidej slovo
function pridejSlovo() {
    var pridej = inputVlastni.value.toLowerCase()

    vlastni.push(pridej)
    localStorage.setItem("vlastni", JSON.stringify(vlastni))

    inputVlastni.value = ''
}

//smaž
function vycistitLS() {
    localStorage.clear()
    location.reload()
    console.log("LS vyčištěno")
}