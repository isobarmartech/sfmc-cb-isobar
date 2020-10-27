export const LAYOUT = `
<!-- SOFT HERO START -->
<table border="0" cellspacing="0" cellpadding="0" width="100%" style="width: 100%;">
    <tr>
        <td align="center">
            <table border="0" cellspacing="0" cellpadding="0" width="620" style="width: 620px;" class="w-full">
                <tr>
                    <td colspan="3" height="15" style="font-size: 1px; line-height: 1px; height: 15px;">&nbsp;</td>
                </tr>
                <tr>
                    <td class="w-20" width="10" style="font-size: 1px; line-height: 1px; width: 10px;">&nbsp;</td>
                    <td>
                        [imageHtml]
                        [contentWrapperHtml]
                    </td>
                    <td class="w-20" width="10" style="font-size: 1px; line-height: 1px; width: 10px;">&nbsp;</td>
                </tr>
                <tr>
                    <td colspan="3" height="20" style="font-size: 1px; line-height: 1px; height: 20px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<!-- SOFT HERO END -->
`;

export const CONTENT_WRAPPER = `
<table border="0" cellspacing="0" cellpadding="0" width="100%" [bgColor]>
    <tr>
        <td colspan="3" height="40" style="font-size: 1px; line-height: 1px; height: 40px;">&nbsp;</td>
    </tr>
    <tr>
        <td class="w-20" width="60" style="font-size: 1px; line-height: 1px; width: 60px;">&nbsp;</td>
        <td>
            [headlineHtml]
            [greetingHtml]
            [bodyHtml]
            [ctaHtml]
            [signatureHtml]
        </td>
        <td class="w-20" width="60" style="font-size: 1px; line-height: 1px; width: 60px;">&nbsp;</td>
    </tr>
    <tr>
        <td colspan="3" height="40" style="font-size: 1px; line-height: 1px; height: 40px;">&nbsp;</td>
    </tr>
</table>
`

export const IMAGE = `
<!-- image -->
<table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tr>
        <td>
            <img src="[image]" alt="" width="600" height="auto" style="display: block; border: 0; width: 600px;" class="w-full">
        </td>
    </tr>
</table>
<!-- image -->
`

export const HEADLINE = `
<!-- headline -->
<table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tr>
        <td class="serif [headlineMobileClass]" align="[alignContent]" style="font-size: [headlineFontsize]; line-height: [headlineLineheight]; color: #2E2926; font-family: 'Sanomat', Georgia, serif; font-weight: 700;">
            [textHeadline]
        </td>
    </tr>
    [spacerHtml]
</table>
<!-- headline -->
`

export const GREETING = `
<!-- greeting -->
<table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tr>
        <td class="sans font-14" align="[alignContent]" style="font-size: 16px; line-height: 21px; color: #2E2926; font-family: 'Sanomat Sans', Arial, sans-serif; font-weight: 700;">
            [textGreeting]
        </td>
    </tr>
    [spacerHtml]
</table>
<!-- greeting -->
`

export const BODY = `
<!-- body -->
<table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tr>
        <td class="sans font-14" align="[alignContent]" style="font-size: 16px; line-height: 21px; color: #2E2926; font-family: 'Sanomat Sans', Arial, sans-serif; font-weight: 300;">
            [textBody]
        </td>
    </tr>
    [spacerHtml]
</table>
<!-- body -->
`

export const CTA_BUTTON = `
<!-- CTA - button -->
<table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tr>
        <td align="[alignContent]">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td style="background-color: [themeColor];">
                        <a class="sans button" href="[linkCta]" target="_blank" style="font-size: 16px; line-height: 16px; color: #ffffff; font-family: 'Sanomat Sans', Arial, sans-serif; font-weight: 700; text-decoration: none; border-radius: 0px; -webkit-border-radius: 0px; background-color: [themeColor]; border-top: 16px solid [themeColor]; border-bottom: 16px solid [themeColor]; border-right: 16px solid [themeColor]; border-left: 16px solid [themeColor]; display: inline-block; text-align: center;">
                            [textCta]  
                        </a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    [spacerHtml]
</table>
<!-- CTA - button -->
`

export const CTA_LINK = `
<!-- CTA - button -->
<table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tr>
        <td align="[alignContent]">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="sans" align="left" style="font-size: 14px; line-height: 20px; color: [themeColor]; font-family: 'Sanomat Sans', Arial, sans-serif; font-weight: 700;">
                        <a href="[linkCta]" target="_blank" style="color: [themeColor]; text-decoration: none;">
                            [textCta]
                        </a>
                    </td>
                    <td align="right" width="12" style="width: 12px;">
                        <a href="[linkCta]" target="_blank">
                            <img src="[linkArrowUrl]" alt="" width="auto" height="12" style="display: block; border: 0; height: 12px;">
                        </a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    [spacerHtml]
</table>
<!-- CTA - button -->
`

export const SIGNATURE = `
<!-- signature -->
<table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tr>
        <td align="[alignContent]">
            <img src="[imageSignature]" alt="" width="250" height="auto" style="display: block; border: 0; width: 250px;" class="w-230">
        </td>
    </tr>
    <tr>
        <td class="sans font-14" align="[alignContent]" style="font-size: 16px; line-height: 21px; color: #2E2926; font-family: 'Sanomat Sans', Arial, sans-serif; font-weight: 300;">
            [textSignature]
        </td>
    </tr>
</table>
<!-- signature -->
`

export const SPACER = `
<tr>
    <td height="[spacerHeight]" style="font-size: 1px; line-height: 1px; height: [spacerHeight]px;">&nbsp;</td>
</tr>
`