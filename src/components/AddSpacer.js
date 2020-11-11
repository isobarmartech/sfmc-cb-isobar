export const addSpacer = (html, content, blocks, height, extra) => {

    if (content === "none") {
        return html.replace(/\[spacerHtml\]/gi, "");
    }

    let spacer = `
    <tr>
        <td ${extra} height="${height}" style="font-size: 1px; line-height: 1px; height: ${height}px;">&nbsp;</td>
    </tr>
    `

    for (let i = 0; i < blocks.length; i++) {

        if (content[blocks[i]]) {
            return html.replace(/\[spacerHtml\]/gi, spacer);
        }

        if (i + 1 === blocks.length) {
            return html.replace(/\[spacerHtml\]/gi, "");
        }
    }
}
