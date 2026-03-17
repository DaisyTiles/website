import fs from 'fs/promises';

const tag_replacements = [
    {
        match: `footer`,
        replace_with: `<footer id="footer" style="margin-top:0px">
    <div class="inner">
        <section>
            <h2>Get in touch</h2>
            <ul class="icons">
                <li><a href="mailto:nicolasquijano.daisytiles@gmail.com" class="icon style2 fa-paper-plane"><span class="label">Mail</span></a></li>
                <li><a href="sms:4086144495&body=Daisy Tiles Inquisition: " class="icon style2 fa-comment-dots"><span class="label">Message</span></a></li>
            </ul>
            <p>nicolasquijano.daisytiles@gmail.com</p>
            <p>+1 (408) 614-4495</p>
        </section>

        <section>
            <h2>Follow</h2>
            <ul class="icons">
                <li><a href="https://github.com/FISHARMNIC" class="icon brands style2 fa-github"><span class="label">GitHub</span></a></li>
                <li><a href="https://www.linkedin.com/in/nicolás-quijano-124657272" class="icon brands style2 fa-linkedin"><span class="label">LinkedIn</span></a></li>
            </ul>
        </section>

        <ul class="copyright">
            <li>&copy; Nicolas Quijano. All rights reserved</li>
            <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
        </ul>
    </div>
</footer>`
    },
    {
        match: `header`,
        id: `header`,
        replace_with: `<header id="header">
    <div class="inner">

        <!-- Logo -->
        <a href="index.html" class="logo">
            <span class="symbol"><img src="images/logo.png" alt="" /></span><span class="title">Daisy
                Tiles</span>
        </a>

        <!-- Nav -->
        <nav>
            <ul>
                <li><a href="#menu">Menu</a></li>
            </ul>
        </nav>

    </div>
</header>`,
    },
    {
        match: `nav`,
        id: `menu`,
        replace_with: `<nav id="menu">
<h2>Menu</h2>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="purchase.html">Purchase</a></li>
        <li><a href="software.html">Software</a></li>
        <li><a href="about.html">About</a></li>
    </ul>
</nav>`
    }
];

function replace(text) {
    for (const tag of tag_replacements) {
        const regex = tag.id
            ? new RegExp(`<${tag.match}[^>]*id=["']${tag.id}["'][^>]*>[\\s\\S]*?<\\/${tag.match}>`, 'g')
            : new RegExp(`<${tag.match}[^>]*>[\\s\\S]*?<\\/${tag.match}>`, 'g');

        text = text.replace(regex, () => tag.replace_with);
    }
    return text;
}

const directory = (file = '') => import.meta.dirname + '/../' + file;

const files = String(await fs.readdir(directory())).split(',').filter(x => x.slice(x.lastIndexOf('.')) == '.html');
// console.log(files);

let lastPromise;

for (const file of files) {
    const path = directory(file);
    const contents = String(await fs.readFile(path));

    const new_contents = replace(contents);
    lastPromise = fs.writeFile(path, new_contents);
}

await lastPromise;

console.log("DONE");