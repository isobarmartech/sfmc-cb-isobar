import React from "react";
import {
    Card,
    Input,
    IconSettings,
    RadioButtonGroup,
    Radio,
    Dropdown,
    Checkbox
} from "@salesforce/design-system-react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../core/helpers";
import { LAYOUT, IMAGE_FULL, IMAGE_PADDED, IMAGE_FIXED, MAIN, HEADLINE, BULLET_INFO, CTA, BODY_TEXT } from "./layouts/imageArticle";
import { ui } from "../constants/ui.js";
import RichTextEditor from '../components/RichTextEditor';
import { richTextToHtml } from "../components/RichTextEditor";
import { addSpacer } from "../components/AddSpacer";

var SDK = require("blocksdk");
var sdk = new SDK();

class Article extends React.Component {
    onChange = (element, value) => {
        this.props.editContent(element, value);
    };

    setContent = () => {
        let pattern, regex;
        let html = LAYOUT;

        // --- Build Layout ---

        // img
        if (this.props.content.toggleImg) {
            regex = /\[htmlImage\]/gi;
            if (this.props.content.imgStyle === "full") {
                html = html.replace(regex, IMAGE_FULL);
            } else if (this.props.content.imgStyle === "padded") {
                html = html.replace(regex, IMAGE_PADDED);
            } else {
                html = html.replace(regex, IMAGE_FIXED);
            }
            html = addSpacer(html, this.props.content, ["toggleHeadline", "toggleBulletInfo", "toggleCta", "toggleBodyText"], 40, `colspan="3"`);
        } else {
            regex = /\[htmlImage\]/gi;
            html = html.replace(regex, "");
        }

        // main
        if (this.props.content.toggleHeadline || this.props.content.toggleBulletInfo || this.props.content.toggleCta || this.props.content.toggleBodyText) {
            regex = /\[htmlMain\]/gi;
            html = html.replace(regex, MAIN);
        } else {
            regex = /\[htmlMain\]/gi;
            html = html.replace(regex, "");
        }

        // headline
        if (this.props.content.toggleHeadline) {
            regex = /\[htmlHeadline\]/gi;
            html = html.replace(regex, HEADLINE);
            if (this.props.content.toggleBulletInfo) {
                html = addSpacer(html, this.props.content, ["toggleBulletInfo"], 10, ``);
            } else {
                html = addSpacer(html, this.props.content, ["toggleCta", "toggleBodyText"], 20, ``);
            }
        } else {
            regex = /\[htmlHeadline\]/gi;
            html = html.replace(regex, "");
        }

        // bullet info
        if (this.props.content.toggleBulletInfo) {
            regex = /\[htmlBulletInfo\]/gi;
            html = html.replace(regex, BULLET_INFO);
            html = addSpacer(html, this.props.content, ["toggleCta", "toggleBodyText"], 20, ``);
        } else {
            regex = /\[htmlBulletInfo\]/gi;
            html = html.replace(regex, "");
        }

        // reorder cta and body
        if (this.props.content.toggleCtaBodyOrder) {
            regex = /\[htmlCta\]/gi;
            html = html.replace(regex, "[htmlCta_temp]");
            regex = /\[htmlBodyText\]/gi;
            html = html.replace(regex, "[htmlCta]");
            regex = /\[htmlCta_temp\]/gi;
            html = html.replace(regex, "[htmlBodyText]");
        }

        // cta
        if (this.props.content.toggleCta) {
            regex = /\[htmlCta\]/gi;
            html = html.replace(regex, CTA);

            if (this.props.content.toggleBodyText && !this.props.content.toggleCtaBodyOrder) {
                html = addSpacer(html, this.props.content, ["toggleBodyText"], 40, ``);
            } else {
                html = addSpacer(html, "none");
            }
        } else {
            regex = /\[htmlCta\]/gi;
            html = html.replace(regex, "");
        }

        // body text
        if (this.props.content.toggleBodyText) {
            regex = /\[htmlBodyText\]/gi;
            html = html.replace(regex, BODY_TEXT);

            if (this.props.content.toggleCta && this.props.content.toggleCtaBodyOrder) {
                html = addSpacer(html, this.props.content, ["toggleCta"], 40, ``);
            } else {
                html = addSpacer(html, "none");
            }
        } else {
            regex = /\[htmlBodyText\]/gi;
            html = html.replace(regex, "");
        }

        // --- Add Configurations ---
        if (this.props.content.imgSrc === "") {
            regex = /\[imgSrc\]/gi;
            html = html.replace(regex, ui.images.shared.placeholders[this.props.content.imgStyle]);
        }
        if (!this.props.content.toggleHeadlineSecondary) {
            regex = /\[textHeadlineSecondary\]/gi;
            html = html.replace(regex, "");
        }
        if (this.props.content.headlineSize === "small") {
            regex = /\[textHeadlineFontsize\]/gi;
            html = html.replace(regex, "24");
            regex = /\[textHeadlineLineheight\]/gi;
            html = html.replace(regex, "28");
        } else if (this.props.content.headlineSize === "large") {
            regex = /\[textHeadlineFontsize\]/gi;
            html = html.replace(regex, "32");
            regex = /\[textHeadlineLineheight\]/gi;
            html = html.replace(regex, "40");
        }
        if (this.props.content.ctaStyle === "outline") {
            regex = /\[ctaColorPrimary\]/gi;
            html = html.replace(regex, "[brandColor]");
            regex = /\[ctaColorSecondary\]/gi;
            html = html.replace(regex, "#FFFFFF");
        } else if (this.props.content.ctaStyle === "default") {
            regex = /\[ctaColorPrimary\]/gi;
            html = html.replace(regex, "#FFFFFF");
            regex = /\[ctaColorSecondary\]/gi;
            html = html.replace(regex, "[brandColor]");
        }

        // Handle Rich Text Input
        if (this.props.content.textBodyText !== undefined) {
            regex = /\[textBodyText\]/gi;
            html = html.replace(regex, richTextToHtml(this.props.content.textBodyText));
        }

        // --- Auto version ---
        let keys = Object.keys(this.props.content);
        for (let i = 0; i < keys.length; i++) {
            pattern = `\\[${keys[i]}\\]`;
            html = html.replace(
                new RegExp(pattern, "gi"),
                this.props.content[keys[i]]
            );
        }

        sdk.setContent(html);
    };

    componentDidMount = () => {
        sdk.getData(data => {
            if (data && Object.keys(data).length > 0) {
                this.props.initFromSaved(data);
            } else {
                this.props.initFromSaved({
                    content: {
                        // Brand Selecting
                        brandName: "Select Brand",
                        brandId: "",
                        brandColor: "",
                        primaryFont: "",

                        // Layouts
                        toggleImg: true,
                        toggleHeadline: true,
                        toggleBulletInfo: true,
                        toggleCta: true,
                        toggleBodyText: true,

                        // Configs
                        imgStyle: "full",
                        alignment: "left",
                        toggleHeadlineSecondary: false,
                        headlineSize: "small",
                        ctaStyle: "default",
                        toggleCtaBodyOrder: false,

                        // Inputs
                        imgSrc: "",
                        textHeadline: "Headline pt. 1",
                        textHeadlineSecondary: "Headline pt. 2",
                        textBulletInfo: "Date x Time x Location",
                        textCta: "Click me",
                        linkCta: "#",
                        textBodyText: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    }
                });
            }
        });
    };

    brandList = () => {
        let arr = [];
        for (let i = 0; i < ui.brands.length; i++) {
            arr.push({
                label: `${ui.brands[i].name}`,
                value: `${ui.brands[i].id}`,
                brandColor: `${ui.brands[i].colors.primary}`,
                primaryFont: `${ui.brands[i].font.primary}`
            })
        }
        return arr;
    }

    render() {
        if (this.props.content.brandName !== undefined && this.props.content.brandName !== "Select Brand") {
            this.setContent();
        }
        return (
            <Card hasNoHeader={true} bodyClassName="slds-card__body_inner">
                <div className="slds-clearfix">
                    <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                        {this.props.content.brandId === "" ? (
                            <h1 className="slds-text-heading_large">{this.props.content.brandName}</h1>
                        ) : null}
                        {this.props.content.brandId !== "" ? (
                            <img src={this.props.content.img_logo} alt={this.props.content.brandName} style={{ height: "30px" }} />
                        ) : null}
                        <IconSettings iconPath="/assets/icons">
                            <div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center slds-m-top_small">
                                <div className="slds-col_padded">
                                    <span>Change brand &nbsp;</span>
                                    <Dropdown
                                        length={null}
                                        iconCategory="utility"
                                        iconName="down"
                                        iconVariant="border-filled"
                                        onSelect={event => {
                                            this.onChange("brandId", event.value);
                                            this.onChange("brandColor", event.brandColor);
                                            this.onChange("brandName", event.label);
                                            this.onChange("primaryFont", event.primaryFont);
                                            this.onChange("img_logo", ui.images[event.value].logo.brand);
                                        }}
                                        options={this.brandList()}
                                    />
                                </div>
                            </div>
                        </IconSettings>
                    </div>
                </div>
                {this.props.content.brandName !== undefined && this.props.content.brandName !== "Select Brand" ? (
                    <>
                        <div className="slds-clearfix">
                            <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                <div className="slds-text-title slds-m-bottom_xx-small">Image</div>
                                <Checkbox
                                    labels={{
                                        label: '',
                                        toggleDisabled: '',
                                        toggleEnabled: ''
                                    }}
                                    variant="toggle"
                                    checked={this.props.content.toggleImg}
                                    onChange={(event) => { this.onChange('toggleImg', event.target.checked) }}
                                />
                            </div>
                            <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                <div className="slds-text-title slds-m-bottom_xx-small">Headline</div>
                                <Checkbox
                                    labels={{
                                        label: '',
                                        toggleDisabled: '',
                                        toggleEnabled: ''
                                    }}
                                    variant="toggle"
                                    checked={this.props.content.toggleHeadline}
                                    onChange={(event) => { this.onChange('toggleHeadline', event.target.checked) }}
                                />
                            </div>
                            <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                <div className="slds-text-title slds-m-bottom_xx-small">Bullet Info</div>
                                <Checkbox
                                    labels={{
                                        label: '',
                                        toggleDisabled: '',
                                        toggleEnabled: ''
                                    }}
                                    variant="toggle"
                                    checked={this.props.content.toggleBulletInfo}
                                    onChange={(event) => { this.onChange('toggleBulletInfo', event.target.checked) }}
                                />
                            </div>
                            <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                <div className="slds-text-title slds-m-bottom_xx-small">CTA</div>
                                <Checkbox
                                    labels={{
                                        label: '',
                                        toggleDisabled: '',
                                        toggleEnabled: ''
                                    }}
                                    variant="toggle"
                                    checked={this.props.content.toggleCta}
                                    onChange={(event) => { this.onChange('toggleCta', event.target.checked) }}
                                />
                            </div>
                            <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                <div className="slds-text-title slds-m-bottom_xx-small">Body Text</div>
                                <Checkbox
                                    labels={{
                                        label: '',
                                        toggleDisabled: '',
                                        toggleEnabled: ''
                                    }}
                                    variant="toggle"
                                    checked={this.props.content.toggleBodyText}
                                    onChange={(event) => { this.onChange('toggleBodyText', event.target.checked) }}
                                />
                            </div>
                        </div>
                        <div className="slds-clearfix">
                            <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                <div className="slds-text-title">Alignment</div>
                                <RadioButtonGroup
                                    onChange={event => {
                                        this.onChange("alignment", event.target.value);
                                    }}
                                >
                                    <Radio
                                        label="Left"
                                        variant="button-group"
                                        value="left"
                                        checked={this.props.content.alignment === "left"}
                                    ></Radio>
                                    <Radio
                                        label="Center"
                                        variant="button-group"
                                        value="center"
                                        checked={this.props.content.alignment === "center"}
                                    ></Radio>
                                </RadioButtonGroup>
                            </div>
                        </div>
                        {this.props.content.toggleImg ? (
                            <>
                                <div className="slds-clearfix">
                                    <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                        <div className="slds-text-title">Image style</div>
                                        <RadioButtonGroup
                                            onChange={event => {
                                                this.onChange("imgStyle", event.target.value);
                                            }}
                                        >
                                            <Radio
                                                label="Full"
                                                variant="button-group"
                                                value="full"
                                                checked={this.props.content.imgStyle === "full"}
                                            ></Radio>
                                            <Radio
                                                label="Padded"
                                                variant="button-group"
                                                value="padded"
                                                checked={this.props.content.imgStyle === "padded"}
                                            ></Radio>
                                            <Radio
                                                label="Fixed"
                                                variant="button-group"
                                                value="fixed"
                                                checked={this.props.content.imgStyle === "fixed"}
                                            ></Radio>
                                        </RadioButtonGroup>
                                    </div>
                                </div>
                                <div className="slds-clearfix">
                                    <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Image URL <span style={{ color: "#0070d2" }}>- Image size: {this.props.content.imgStyle === "full" ? "Width: 600px" : (this.props.content.imgStyle === "padded" ? "Width: 540px" : "Width: 280px")}</span></div>
                                    <Input
                                        value={this.props.content.imgSrc}
                                        onChange={event => {
                                            this.onChange("imgSrc", event.target.value);
                                        }}
                                    />
                                </div>
                            </>
                        ) : null}
                        {this.props.content.toggleHeadline ? (
                            <>
                                <div className="slds-clearfix">
                                    <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                        <div className="slds-text-title">Headline size</div>
                                        <RadioButtonGroup
                                            onChange={event => {
                                                this.onChange("headlineSize", event.target.value);
                                            }}
                                        >
                                            <Radio
                                                label="Small"
                                                variant="button-group"
                                                value="small"
                                                checked={this.props.content.headlineSize === "small"}
                                            ></Radio>
                                            <Radio
                                                label="Large"
                                                variant="button-group"
                                                value="large"
                                                checked={this.props.content.headlineSize === "large"}
                                            ></Radio>
                                        </RadioButtonGroup>
                                    </div>
                                    <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                        <div className="slds-text-title slds-m-bottom_xx-small">Colored text</div>
                                        <Checkbox
                                            labels={{
                                                label: '',
                                                toggleDisabled: '',
                                                toggleEnabled: ''
                                            }}
                                            variant="toggle"
                                            checked={this.props.content.toggleHeadlineSecondary}
                                            onChange={(event) => { this.onChange('toggleHeadlineSecondary', event.target.checked) }}
                                        />
                                    </div>
                                </div>
                                <div className="slds-clearfix">
                                    <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Headline Text</div>
                                    {!this.props.content.toggleHeadlineSecondary ? (
                                        <>
                                            <Input
                                                value={this.props.content.textHeadline}
                                                onChange={event => {
                                                    this.onChange("textHeadline", event.target.value);
                                                }}
                                            />
                                        </>
                                    ) : null}
                                    {this.props.content.toggleHeadlineSecondary ? (
                                        <>
                                            <div className="slds-float_left slds-m-right_medium">
                                                <div className="slds-text-body_small slds-text-color_weak slds-m-bottom_xx-small">part. 1</div>
                                                <Input
                                                    value={this.props.content.textHeadline}
                                                    onChange={event => {
                                                        this.onChange("textHeadline", event.target.value);
                                                    }}
                                                />
                                            </div>
                                            <div className="slds-float_left slds-m-right_medium">
                                                <div className="slds-text-body_small slds-text-color_weak slds-m-bottom_xx-small">part. 2</div>
                                                <Input
                                                    value={this.props.content.textHeadlineSecondary}
                                                    onChange={event => {
                                                        this.onChange("textHeadlineSecondary", event.target.value);
                                                    }}
                                                />
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            </>
                        ) : null}
                        {this.props.content.toggleBulletInfo ? (
                            <>
                                <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Bullet Info Text</div>
                                <Input
                                    value={this.props.content.textBulletInfo}
                                    onChange={event => {
                                        this.onChange("textBulletInfo", event.target.value);
                                    }}
                                />
                            </>
                        ) : null}
                        {this.props.content.toggleCta ? (
                            <>
                                <div className="slds-clearfix">
                                    <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                        <div className="slds-text-title">CTA Style</div>
                                        <RadioButtonGroup
                                            onChange={event => {
                                                this.onChange("ctaStyle", event.target.value);
                                            }}
                                        >
                                            <Radio
                                                label="Default"
                                                variant="button-group"
                                                value="default"
                                                checked={this.props.content.ctaStyle === "default"}
                                            ></Radio>
                                            <Radio
                                                label="Outline"
                                                variant="button-group"
                                                value="outline"
                                                checked={this.props.content.ctaStyle === "outline"}
                                            ></Radio>
                                        </RadioButtonGroup>
                                    </div>
                                </div>
                                <div className="slds-clearfix">
                                    <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">CTA Text</div>
                                    <Input
                                        value={this.props.content.textCta}
                                        onChange={event => {
                                            this.onChange("textCta", event.target.value);
                                        }}
                                    />
                                    <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">CTA Link</div>
                                    <Input
                                        value={this.props.content.linkCta}
                                        onChange={event => {
                                            this.onChange("linkCta", event.target.value);
                                        }}
                                    />
                                </div>
                            </>
                        ) : null}
                        {this.props.content.toggleBodyText ? (
                            <>
                                <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Body Text</div>
                                <RichTextEditor onChange={(data) => this.onChange("textBodyText", data)} text={this.props.content.textBodyText} toggleBold={false} toggleItalic={false} toggleLink={true} />
                            </>
                        ) : null}
                        {this.props.content.toggleCta && this.props.content.toggleBodyText ? (
                            <>
                                <div className="slds-text-title slds-m-bottom_xx-small">Toggle CTA and Body Text Order</div>
                                <Checkbox
                                    labels={{
                                        label: '',
                                        toggleDisabled: '',
                                        toggleEnabled: ''
                                    }}
                                    variant="toggle"
                                    checked={this.props.content.toggleCtaBodyOrder}
                                    onChange={(event) => { this.onChange('toggleCtaBodyOrder', event.target.checked) }}
                                />
                            </>
                        ) : null}
                    </>
                ) : null
                }
            </Card>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);