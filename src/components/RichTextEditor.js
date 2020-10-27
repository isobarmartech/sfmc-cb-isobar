import React from "react";
import { IconSettings, ButtonGroup, Button, Textarea } from "@salesforce/design-system-react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../core/helpers";

class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.rte_ref = React.createRef();
    }

    onBoldClick = () => {
        let selectionStart = document.getElementById(this.rte_ref.current.generatedId).selectionStart;
        let selectionEnd = document.getElementById(this.rte_ref.current.generatedId).selectionEnd;
        let text = document.getElementById(this.rte_ref.current.generatedId).value.substring(selectionStart, selectionEnd);
        text = `[b]${text}[/b]`;
        let text_before = document.getElementById(this.rte_ref.current.generatedId).value.substring(0, selectionStart);
        let text_after = document.getElementById(this.rte_ref.current.generatedId).value.substring(selectionEnd);
        this.props.onChange(text_before + text + text_after);
    };

    onItalicClick = () => {
        let selectionStart = document.getElementById(this.rte_ref.current.generatedId).selectionStart;
        let selectionEnd = document.getElementById(this.rte_ref.current.generatedId).selectionEnd;
        let text = document.getElementById(this.rte_ref.current.generatedId).value.substring(selectionStart, selectionEnd);
        text = `[i]${text}[/i]`;
        let text_before = document.getElementById(this.rte_ref.current.generatedId).value.substring(0, selectionStart);
        let text_after = document.getElementById(this.rte_ref.current.generatedId).value.substring(selectionEnd);
        this.props.onChange(text_before + text + text_after);
    };

    onLinkClick = () => {
        let selectionStart = document.getElementById(this.rte_ref.current.generatedId).selectionStart;
        let selectionEnd = document.getElementById(this.rte_ref.current.generatedId).selectionEnd;
        if (selectionEnd && selectionStart >= 0 && selectionStart !== selectionEnd) {
            let url = prompt("Please enter your name");
            if (url) {
                let selectionStart = document.getElementById(this.rte_ref.current.generatedId).selectionStart;
                let selectionEnd = document.getElementById(this.rte_ref.current.generatedId).selectionEnd;
                let text = document.getElementById(this.rte_ref.current.generatedId).value.substring(selectionStart, selectionEnd);
                text = `[a url="${url}"]${text}[/a]`;
                let text_before = document.getElementById(this.rte_ref.current.generatedId).value.substring(0, selectionStart);
                let text_after = document.getElementById(this.rte_ref.current.generatedId).value.substring(selectionEnd);
                this.props.onChange(text_before + text + text_after);
            }
        }
    };

    onChange = (value) => {
        this.props.onChange(value);
    };

    render() {
        return (
            <>
                <IconSettings iconPath="/assets/icons">
                    {this.props.toggleBold || this.props.toggleItalic || this.props.toggleLink ? (
                        <ButtonGroup>
                            {this.props.toggleBold ? (
                                <Button
                                    iconName="bold"
                                    iconVariant="border"
                                    variant="icon"
                                    onClick={() => {
                                        this.onBoldClick();
                                    }}
                                />
                            ) : null}
                            {this.props.toggleItalic ? (
                                <Button
                                    iconName="italic"
                                    iconVariant="border"
                                    variant="icon"
                                    onClick={() => {
                                        this.onItalicClick();
                                    }}
                                />
                            ) : null}
                            {this.props.toggleLink ? (
                                <Button
                                    iconName="link"
                                    iconVariant="border"
                                    variant="icon"
                                    onClick={() => {
                                        this.onLinkClick();
                                    }}
                                />
                            ) : (
                                    <></>
                                )}
                        </ButtonGroup>
                    ) : null}
                </IconSettings>
                <Textarea
                    ref={this.rte_ref}
                    value={this.props.text}
                    onChange={(event) => {
                        this.onChange(event.target.value);
                    }}
                />
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RichTextEditor);

export const richTextToHtml = (value) => {
    let richText = value;
    let areg = /\[a url="([^"]+)"]((.|\n)+?)\[\/a\]/g;
    richText = richText.replace(areg, (match, $1, $2) => {
        let result = `<a target="_blank" style="text-decoration: underline; color: [themeColor];" href="${$1}">${$2}</a>`;
        return result;
    });

    let breg = /\[b\]((.|\n)+?)\[\/b\]/g;
    richText = richText.replace(breg, (match, $1) => {
        let result = `<b>${$1}</b>`;
        return result;
    });

    let ireg = /\[i\]((.|\n)+?)\[\/i\]/g;
    richText = richText.replace(ireg, (match, $1) => {
        let result = `<i>${$1}</i>`;
        return result;
    });

    let linereg = /\n/g;
    richText = richText.replace(linereg, "<br>");

    return richText;
}