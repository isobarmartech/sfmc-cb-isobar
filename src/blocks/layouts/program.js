export const LAYOUT = `
<!-- PROGRAM START -->
<table border="0" cellspacing="0" cellpadding="0" width="100%" bgcolor="#000000">
    <tr>
        <td align="center">
            <table border="0" cellspacing="0" cellpadding="0" width="600" style="width: 600px;" class="w-full">
                <tr>
                    <td width="70" class="w-30" style="font-size: 1px; line-height: 1px; width: 70px;">&nbsp;</td>
                    <td>
                        <table border="0" cellspacing="0" cellpadding="0" width="100%">
                            <tr>
                                <td height="50" style="font-size: 1px; line-height: 1px; height: 50px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="font-size: 32px; line-height: 40px; color: #FFFFFF; font-family: [primaryFont]">
                                    [textIntro]
                                </td>
                            </tr>
                            <tr>
                                <td height="40" style="font-size: 1px; line-height: 1px; height: 40px;">&nbsp;</td>
                            </tr>
                            [htmlEvents]
                            <tr>
                                <td height="50" style="font-size: 1px; line-height: 1px; height: 50px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                    <td width="70" class="w-30" style="font-size: 1px; line-height: 1px; width: 70px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
[htmlSignupBox]
<table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tr>
        <td align="center">
            <table border="0" cellspacing="0" cellpadding="0" width="600" style="width: 600px;" class="w-full">
                <tr>
                    <td height="40" style="font-size: 1px; line-height: 1px; height: 40px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<!-- PROGRAM END -->
`;

export const SINGLE_EVENT = `
<!-- single event -->
<tr>
    <td style="font-size: 32px; line-height: 40px; color: #FFFFFF; font-family: [primaryFont]">
        [textTime]
        <br>
        [textHeadline]
    </td>
</tr>
[htmlSubheadline]
<tr>
    <td height="40" style="font-size: 1px; line-height: 1px; height: 40px;">&nbsp;</td>
</tr>
<!-- single event -->
`

export const SUBHEADLINE = `
<tr>
    <td style="font-size: 16px; line-height: 24px; color: #FFFFFF; font-family: [primaryFont]">
        [textSubheadline]
    </td>
</tr>
`

export const SIGNUP_BOX = `
<table border="0" cellspacing="0" cellpadding="0" width="100%" bgcolor="[brandColor]">
    
        <tr>
            <td align="center">
                <table border="0" cellspacing="0" cellpadding="0" width="600" style="width: 600px;" class="w-full">
                    
                        <tr>
                            <td width="70" class="w-20" style="font-size: 1px; line-height: 1px; width: 70px;">&nbsp;</td>
                            <td>
                                <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                    
                                        <tr>
                                            <td height="40" style="font-size: 1px; line-height: 1px; height: 40px;">&nbsp;</td>
                                        </tr>
                                        [htmlBodyText]
                                        [htmlCta]
                                        <tr>
                                            <td height="40" style="font-size: 1px; line-height: 1px; height: 40px;">&nbsp;</td>
                                        </tr>
                                    
                                </table>
                            </td>
                            <td width="70" class="w-20" style="font-size: 1px; line-height: 1px; width: 70px;">&nbsp;</td>
                        </tr>
                    
                </table>
            </td>
        </tr>
    
</table>
`

export const BODY_TEXT = `
<!-- body text -->
<tr>
    <td style="font-size: 18px; line-height: 24px; color: #FFFFFF; font-family: [primaryFont]">
        <span style="color: #000000">[textBody_black]</span> [textBody_white]
    </td>
</tr>
<tr>
    <td height="30" style="font-size: 1px; line-height: 1px; height: 30px;">&nbsp;</td>
</tr>
<!-- body text -->
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
<tr>
    <td height="30" style="font-size: 1px; line-height: 1px; height: 30px;">&nbsp;</td>
</tr>
<!-- cta -->
`