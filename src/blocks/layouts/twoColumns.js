export const LAYOUT = `
<!-- ARTICLE IMAGE LEFT START -->
<table border="0" cellspacing="0" cellpadding="0" width="100%" style="width: 100%;">
    <tr>
        <td align="center">
            <table border="0" cellspacing="0" cellpadding="0" width="600" style="width: 600px;" class="w-full" bgcolor="#FFFFFF">
                <tr>
                    <td width="30" style="font-size: 1px; line-height: 1px; width: 30px;">&nbsp;</td>
                    <td>
                        <table border="0" cellspacing="0" cellpadding="0" width="100%" dir="[direction]">
                            <tr>
                                <th class="break" width="240" style="width: 240;" valign="middle">
                                    <table border="0" cellspacing="0" cellpadding="0" width="100%" dir="ltr">
                                        <tr>
                                            <td align="center" width="240" style="width: 240px;">
                                                <img src="[imgSrc]" alt="" width="240" height="auto" style="display: block; border: 0; width: 240px;">
                                            </td>
                                        </tr>
                                    </table>
                                </th>
                                <th class="break" width="35" height="30" style="font-size: 1px; line-height: 1px; width: 35px; height: 30px;">&nbsp;</th>
                                <th class="break" width="265" style="width: 265px;" valign="middle">
                                    <table border="0" cellspacing="0" cellpadding="0" width="100%" dir="ltr">
                                        [htmlHeadline]
                                        [htmlBodyText]
                                        [htmlCta]
                                    </table>
                                </th>
                            </tr>
                        </table>
                    </td>
                    <td width="30" style="font-size: 1px; line-height: 1px; width: 30px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<!-- ARTICLE IMAGE LEFT END -->
`;

export const LAYOUT_NOIMAGE = `
<!-- ARTICLE IMAGE LEFT START -->
<table border="0" cellspacing="0" cellpadding="0" width="100%" style="width: 100%;">
    <tr>
        <td align="center">
            <table border="0" cellspacing="0" cellpadding="0" width="600" style="width: 600px;" class="w-full" bgcolor="#FFFFFF" dir="[direction]">
                <tr>
                    <td class="w-30" width="200" style="font-size: 1px; line-height: 1px; width: 200px;">&nbsp;</td>
                    <td>
                        <table border="0" cellspacing="0" cellpadding="0" width="100%" dir="ltr">
                            [htmlHeadline]
                            [htmlBodyText]
                            [htmlCta]
                        </table>
                    </td>
                    <td width="30" style="font-size: 1px; line-height: 1px; width: 30px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<!-- ARTICLE IMAGE LEFT END -->
`;


export const HEADLINE = `
<!-- headline -->
<tr>
    <td height="20" style="font-size: 1px; line-height: 1px; height: 20px;">&nbsp;</td>
</tr>
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