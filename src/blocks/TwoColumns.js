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
import { LAYOUT, LAYOUT_NOIMAGE, HEADLINE, CTA, BODY_TEXT } from "./layouts/twoColumns";
import { ui } from "../constants/ui.js";
import RichTextEditor from '../components/RichTextEditor';
import { richTextToHtml } from "../components/RichTextEditor";

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
        if (!this.props.content.toggleImg) {
            html = LAYOUT_NOIMAGE;
        }

        // Auto add layout
        const layoutArr = [{
            "toggle_name": "toggleHeadline",
            "html_regex": "htmlHeadline",
            "layout": HEADLINE
        }, {
            "toggle_name": "toggleCta",
            "html_regex": "htmlCta",
            "layout": CTA
        }, {
            "toggle_name": "toggleBodyText",
            "html_regex": "htmlBodyText",
            "layout": BODY_TEXT
        }]

        for (let i = 0; i < layoutArr.length; i++) {
            regex = new RegExp(`\\[${layoutArr[i].html_regex}\\]`, "gi")
            if (this.props.content[layoutArr[i].toggle_name]) {
                html = html.replace(regex, layoutArr[i].layout);
            } else {
                html = html.replace(regex, "");
            }
        }

        // --- Add Configurations ---
        if (this.props.content.imgSrc === "") {
            regex = /\[imgSrc\]/gi;
            html = html.replace(regex, "http://via.placeholder.com/240x240");
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
                        toggleCta: false,
                        toggleBodyText: true,

                        // Configs
                        direction: "ltr",
                        toggleHeadlineSecondary: true,
                        headlineSize: "large",
                        ctaStyle: "default",

                        // Inputs
                        imgSrc: "",
                        textHeadline: "Headline pt. 1",
                        textHeadlineSecondary: "Headline pt. 2",
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
                website: `${ui.brands[i].website}`,
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
                                            this.onChange("link_logo", event.website);
                                            this.onChange("primaryFont", event.primaryFont);
                                            this.onChange("img_logo", ui.images[event.value].logo.brand);
                                            if (event.value !== "iso") {
                                                this.onChange("toggleME", false);
                                            }
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
                        </div>
                        <div className="slds-clearfix">
                            <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                <div className="slds-text-title">Direction</div>
                                <RadioButtonGroup
                                    onChange={event => {
                                        this.onChange("direction", event.target.value);
                                    }}
                                >
                                    <Radio
                                        label="Text Left"
                                        variant="button-group"
                                        value="rtl"
                                        checked={this.props.content.direction === "rtl"}
                                    ></Radio>
                                    <Radio
                                        label="Text Right"
                                        variant="button-group"
                                        value="ltr"
                                        checked={this.props.content.direction === "ltr"}
                                    ></Radio>
                                </RadioButtonGroup>
                            </div>
                        </div>
                        {this.props.content.toggleImg ? (
                            <>
                                <div className="slds-clearfix">
                                    <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Image URL <span style={{ color: "#0070d2" }}>- Image size: Width: 240px</span></div>
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
                    </>
                ) : null
                }
            </Card>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);