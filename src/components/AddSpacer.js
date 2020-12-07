export const addSpacer = (html, content, blocks, height, extra) => {

    let spacer = `
    <tr>
        <td ${extra} height="${height}" style="font-size: 1px; line-height: 1px; height: ${height}px;">&nbsp;</td>
    </tr>
    `

    if (blocks === true) {
        return html.replace(/\[spacerHtml\]/gi, spacer);
    } else if (blocks.length > 0) {

        for (let i = 0; i < blocks.length; i++) {

            if (content[blocks[i]]) {
                return html.replace(/\[spacerHtml\]/gi, spacer);
            }

            if (i + 1 === blocks.length) {
                return html.replace(/\[spacerHtml\]/gi, "");
            }
        }

    } else {
        return html.replace(/\[spacerHtml\]/gi, "");
    }
}
