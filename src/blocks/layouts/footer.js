export const LAYOUT = `
<!-- FOOTER START -->
<table border="0" cellspacing="0" cellpadding="0" width="100%" bgcolor="[colorBg]">
    <tr>
        <td align="center">
            <table border="0" cellspacing="0" cellpadding="0" width="600" style="width: 600px;" class="w-full">
                <tr>
                    <td width="[paddingWidth]" class="w-30" style="font-size: 1px; line-height: 1px; width: [paddingWidth]px;">&nbsp;</td>
                    <td>
                        <table border="0" cellspacing="0" cellpadding="0" width="100%">
                            [spacerHtml]
                            <tr>
                                <td colspan="3">
                                    <a href="[link_logo]" target="_blank">
                                        <img src="[img_logo_brand]" alt="[alt_text]" width="auto" height="[img_logo_height]" style="display: block; border: 0; height: [img_logo_height]px; color: [brandColor]; font-family: [primaryFont]; font-size: 28px; font-weight: 400;" />
                                    </a>
                                </td>
                            </tr>
                            [htmlInformation]
                            [spacerHtml]
                        </table>
                    </td>
                    <td width="[paddingWidth]" class="w-30" style="font-size: 1px; line-height: 1px; width: [paddingWidth]px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<!-- FOOTER END -->
[htmlUnsubscribe]
`;


export const INFORMATION = `
<tr>
    <td height="25" colspan="3" style="font-size: 1px; line-height: 1px; height: 25px;">&nbsp;</td>
</tr>
<tr>
    <td style="font-size: 12px; line-height: 16px; color: [colorText]; font-family: [primaryFont];">
        [brandName]
        <br />
        [textAddressStreet]
        <br />
        [textAddressCity]
    </td>
    [htmlHyperlinks]
</tr>
`;


export const HYPERLINKS = `
<td width="50" class="w-20" style="font-size: 1px; line-height: 1px; width: 50px;">&nbsp;</td>
<td style="font-size: 12px; line-height: 16px; color: [colorText]; font-family: [primaryFont];">
    <a href="[linkMail]" style="color: [colorText]; text-decoration: underline;">
        Mail
    </a>
    <br />
    <a href="[linkPhone]" style="color: [colorText]; text-decoration: underline;">
        [textPhone]
    </a>
    <br />
    <a href="[textAddressMaps]" target="_blank" style="color: [colorText]; text-decoration: underline;">
        [textMaps]
    </a>
</td>
`;

export const UNSUBSCRIBE = `
<!-- UNSUBSCRIBE START -->
<table border="0" cellspacing="0" cellpadding="0" width="100%" bgcolor="[unsubColorBg]">
    <tr>
        <td align="center">
            <table border="0" cellspacing="0" cellpadding="0" width="600" style="width: 600px;" class="w-full">
                <tr>
                    <td width="70" class="w-20" style="font-size: 1px; line-height: 1px; width: 70px;">&nbsp;</td>
                    <td>
                        <table border="0" cellspacing="0" cellpadding="0" width="100%">
                            <tr>
                                <td height="15" style="font-size: 1px; line-height: 1px; height: 15px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td align="center" style="font-size: 12px; line-height: 16px; color: [unsubColorText]; font-family: [primaryFont]">
                                    <a href="[linkUnsubscribe]" style="color: [unsubColorText]; text-decoration: underline;">
                                        [textUnsubscribe]
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td height="15" style="font-size: 1px; line-height: 1px; height: 15px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                    <td width="70" class="w-20" style="font-size: 1px; line-height: 1px; width: 70px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<!-- UNSUBSCRIBE END -->
`;