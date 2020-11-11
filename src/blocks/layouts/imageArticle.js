export const LAYOUT = `
<!-- IMAGE ARTICLE START -->
<table border="0" cellspacing="0" cellpadding="0" width="100%" style="width: 100%;">
    <tr>
        <td align="center">
            <table border="0" cellspacing="0" cellpadding="0" width="600" style="width: 600px;" class="w-full">
                <tr>
                    <td>
                        [htmlImage]
                        [htmlMain]
                    </td>
                </tr>
                <tr>
                    <td height="40" style="font-size: 1px; line-height: 1px; height: 40px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<!-- IMAGE ARTICLE END -->
`;

export const IMAGE_FULL = `
<!-- image -->
<table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tr>
        <td align="center">
            <img src="[imgSrc]" alt="" width="600" height="auto" style="display: block; border: 0; width: 600px;" class="w-full">
        </td>
    </tr>
    [spacerHtml]
</table>
<!-- image -->
`

export const IMAGE_PADDED = `
<!-- image -->
<table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tr>
        <td class="w-20" width="30" style="font-size: 1px; line-height: 1px; width: 30px;">&nbsp;</td>
        <td align="center">
            <img src="[imgSrc]" alt="" width="540" height="auto" style="display: block; border: 0; width: 540px;" class="w-full">
        </td>
        <td class="w-20" width="30" style="font-size: 1px; line-height: 1px; width: 30px;">&nbsp;</td>
    </tr>
    [spacerHtml]
</table>
<!-- image -->
`

export const IMAGE_FIXED = `
<!-- image -->
<table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tr>
        <td class="w-20" width="30" style="font-size: 1px; line-height: 1px; width: 30px;">&nbsp;</td>
        <td align="center">
            <img src="[imgSrc]" alt="" width="280" height="auto" style="display: block; border: 0; width: 280px;">
        </td>
        <td class="w-20" width="30" style="font-size: 1px; line-height: 1px; width: 30px;">&nbsp;</td>
    </tr>
    [spacerHtml]
</table>
<!-- image -->
`

export const MAIN = `
<!-- main -->
<table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tr>
        <td width="30" style="font-size: 1px; line-height: 1px; width: 30px;">&nbsp;</td>
        <td>
            <table border="0" cellspacing="0" cellpadding="0" width="100%">
                [htmlHeadline]
                [htmlBulletInfo]
                [htmlCta]
                [htmlBodyText]
            </table>
        </td>
        <td width="30" style="font-size: 1px; line-height: 1px; width: 30px;">&nbsp;</td>
    </tr>
</table>
<!-- main -->
`


export const HEADLINE = `
<!-- headline -->
<tr>
    <td align="[alignment]" style="font-size: [textHeadlineFontsize]px; line-height: [textHeadlineLineheight]px; color: #000000; font-family: [primaryFont]; font-weight: 400;">
        [textHeadline] <span style="color: [brandColor];">[textHeadlineSecondary]</span>
    </td>
</tr>
[spacerHtml]
<!-- headline -->
`

export const BULLET_INFO = `
<!-- bullet info -->
<tr>
    <td align="[alignment]">
        <table border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td width="15" style="width: 15px; font-size: 18px; line-height: 30px; color: [brandColor]" valign="top">
                    &bull;
                </td>
                <td class="link_black" style="font-size: 16px; line-height: 24px; color: #000000; font-family: [primaryFont]; font-weight: 400; text-decoration: underline;">
                    [textBulletInfo]
                </td>
            </tr>
        </table>
    </td>
</tr>
[spacerHtml]
<!-- bullet info -->
`

export const CTA = `
<!-- cta -->
<tr>
    <td align="[alignment]">
        <table border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td style="border: 2px solid [ctaColorPrimary]">
                    <a href="[linkCta]" target="_blank" style="font-size: 16px; line-height: 20px; font-family: [primaryFont]; color: [ctaColorPrimary]; text-decoration: none; border-radius: 0px; -webkit-border-radius: 0px; background-color: [ctaColorSecondary]; border-top: 15px solid [ctaColorSecondary]; border-bottom: 15px solid [ctaColorSecondary]; border-right: 30px solid [ctaColorSecondary]; border-left: 30px solid [ctaColorSecondary]; display: inline-block; font-weight: 400;">
                        <!--[if mso]>&nbsp;&nbsp;&nbsp;<![endif]--><span>[textCta]</span>
                        <!--[if mso]>&nbsp;&nbsp;&nbsp;<![endif]-->
                    </a>
                </td>
            </tr>
        </table>
    </td>
</tr>
[spacerHtml]
<!-- cta -->
`

export const BODY_TEXT = `
<!-- body text -->
<tr>
    <td align="[alignment]" style="font-size: 16px; line-height: 24px; color: #000000; font-family: [primaryFont]; font-weight: 400;">
        [textBodyText]
    </td>
</tr>
[spacerHtml]
<!-- body text -->
`