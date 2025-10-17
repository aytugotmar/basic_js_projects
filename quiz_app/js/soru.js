function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
    this.soruMetni = soruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
}

const soruListesi = [
    new Soru("Hangisi bir js frameworküdür?", { a: "React", b: "ASP.NET", c: "Spring Boot", d: "Django" }, "a"),
    new Soru("Hangisi frontend kapsamında değildir?", { a: "Next.js", b: "HTML", c: "Spring Boot", d: "CSS" }, "c"),
    new Soru("Hangisi backend kapsamındadır?", { a: "Next.js", b: "Node.js", c: "React.js", d: "Vue.js" }, "b"),
    new Soru("Hangisi bir frameworküdür?", { a: "Python", b: "HTML", c: "CSS", d: "Django" }, "d")
]