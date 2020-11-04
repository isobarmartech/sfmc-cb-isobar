export const LAYOUT = `
<!-- DOUBLE STORY START -->
<table border="0" cellspacing="0" cellpadding="0" width="100%" style="width: 100%;">
    <tr>
        <td align="center">
            <table border="0" cellspacing="0" cellpadding="0" width="600" style="width: 600px;" class="w-full">
                <tr>
                    <td width="30" style="font-size: 1px; line-height: 1px; width: 30px;">&nbsp;</td>
                    <td>
                        <table border="0" cellspacing="0" cellpadding="0" width="100%">
                            <tr>
                                [htmlColumn]
                            </tr>
                        </table>
                    </td>
                    <td width="30" style="font-size: 1px; line-height: 1px; width: 30px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<!-- DOUBLE STORY END -->
`;

export const COLUMN = `
<th class="break" valign="top" width="250" style="width: 250px;">
    [htmlImg]
    <table border="0" cellspacing="0" cellpadding="0" width="100%">
        [htmlHeadline]
        [htmlBodyText]
        [htmlCta]
    </table>
</th>
`

export const COLUMN_SPACER = `
<th class="hide" width="40" height="40" style="font-size: 1px; line-height: 1px; width: 40px; height: 40px;">&nbsp;</th>
`

export const IMAGE = `
<!-- image -->
<table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tr>
        <td align="center">
            <img src="[imgSrc]" alt="" width="250" height="auto" style="display: block; border: 0; width: 250px;" class="w-full">
        </td>
    </tr>
    <tr>
        <td height="20" style="font-size: 1px; line-height: 1px; height: 20px;">&nbsp;</td>
    </tr>
</table>
<!-- image -->
`

export const HEADLINE = `
<!-- headline -->
<tr>
    <td align="left" style="font-size: [textHeadlineFontsize]px; line-height: [textHeadlineLineheight]px; color: #000000; font-family: [primaryFont]; font-weight: 400;">
        [textHeadline] <span style="color: [brandColor];">[textHeadlineSecondary]</span>
    </td>
</tr>
<tr>
    <td height="10" style="font-size: 1px; line-height: 1px; height: 10px;">&nbsp;</td>
</tr>
<!-- headline -->
`

export const BODY_TEXT = `
<!-- body text -->
<tr>
    <td align="left" style="font-size: 16px; line-height: 24px; color: #000000; font-family: [primaryFont]; font-weight: 400;">
        [textBodyText]
    </td>
</tr>
<tr>
    <td height="20" style="font-size: 1px; line-height: 1px; height: 20px;">&nbsp;</td>
</tr>
<!-- body text -->
`

export const CTA = `
<!-- cta -->
<tr>
    <td align="left">
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
<!-- cta -->
`