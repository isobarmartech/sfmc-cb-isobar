export const LAYOUT = `
<!-- CTA GROUP START -->
<table border="0" cellspacing="0" cellpadding="0" width="100%" style="width: 100%;">
    <tr>
        <td align="center">
            <table border="0" cellspacing="0" cellpadding="0" width="600" style="width: 600px;" class="w-full" bgcolor="#FFFFFF">
                <tr>
                    <td width="30" style="font-size: 1px; line-height: 1px; width: 30px;">&nbsp;</td>
                    <td>
                        <table border="0" cellspacing="0" cellpadding="0" width="100%">
                            [htmlCta]
                        </table>
                    </td>
                    <td width="30" style="font-size: 1px; line-height: 1px; width: 30px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<!-- CTA GROUP END -->
`;


export const CTA_BUTTON = `
<tr>
    <td width="30" style="font-size: 1px; line-height: 1px; width: 30px;">&nbsp;</td>
    <td align="center">
        <table border="0" cellspacing="0" cellpadding="0" class="w-full">
            <tr>
                <td align="center" style="background-color: [ctaColorPrimary]; border: 2px solid [ctaColorSecondary]; width:320px;" width="320">
                    <a class="cta_fullwidth" href="[linkCta]" target="_blank" style="width: 320px; font-size: 16px; line-height: 16px; font-weight: 400; font-family: [primaryFont]; color: [ctaColorSecondary]; text-decoration: none; border-radius: 0px; -webkit-border-radius: 0px; background-color: [ctaColorPrimary]; border-top: 15px solid [ctaColorPrimary]; border-bottom: 15px solid [ctaColorPrimary]; display: inline-block; text-align: center;">
                        [textCta]
                    </a>
                </td>
            </tr>
        </table>
    </td>
    <td width="30" style="font-size: 1px; line-height: 1px; width: 30px;">&nbsp;</td>
</tr>
<tr>
    <td colspan="3" height="20" style="font-size: 1px; line-height: 1px; height: 20px;">&nbsp;</td>
</tr>
`

export const CTA_LINK = `
<tr>
    <td width="30" style="font-size: 1px; line-height: 1px; width: 30px;">&nbsp;</td>
    <td align="center" style="font-size: 16px; line-height: 20px; color: [ctaColorPrimary]; font-family: [primaryFont]; font-weight: 400;">
        <a href="[linkCta]" target="_blank" style="color: [ctaColorPrimary]; text-decoration: underline;">
            [textCta]
        </a>
    </td>
    <td width="30" style="font-size: 1px; line-height: 1px; width: 30px;">&nbsp;</td>
</tr>
<tr>
    <td colspan="3" height="20" style="font-size: 1px; line-height: 1px; height: 20px;">&nbsp;</td>
</tr>
`