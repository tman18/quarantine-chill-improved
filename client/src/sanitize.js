


export function sanitizeString(html)
{
    const tagless = stripHtml(html)

    if (tagless.length > 200) {
        const shortened = tagless.substring(0,200)
        const indexOfLastSpace = shortened.lastIndexOf(" ")
        const shortenedAtWord = shortened.substring(0,indexOfLastSpace)

        return shortenedAtWord + "..."
    }else{
        return tagless
    }
}

function stripHtml(html)
{
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}
