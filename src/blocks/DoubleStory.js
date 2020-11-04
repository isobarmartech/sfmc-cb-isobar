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
import { LAYOUT, COLUMN, COLUMN_SPACER, IMAGE, HEADLINE, CTA, BODY_TEXT } from "./layouts/doubleStory";
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
        let cols = ""
        for (let i = 0; i < 2; i++) {

            let col = COLUMN;

            if (this.props.content.toggleImg) {
                regex = /\[htmlImg\]/gi;
                col = col.replace(regex, IMAGE);
                regex = /\[imgSrc\]/gi;
                col = col.replace(regex, `[imgSrc_${i + 1}]`);
            } else {
                regex = /\[htmlImg\]/gi;
                col = col.replace(regex, "");
            }
            if (this.props.content.toggleHeadline) {
                regex = /\[htmlHeadline\]/gi;
                col = col.replace(regex, HEADLINE);
                regex = /\[textHeadline\]/gi;
                col = col.replace(regex, `[textHeadline_${i + 1}]`);
                regex = /\[textHeadlineSecondary\]/gi;
                col = col.replace(regex, `[textHeadlineSecondary_${i + 1}]`);
            } else {
                regex = /\[htmlHeadline\]/gi;
                col = col.replace(regex, "");
            }
            if (this.props.content.toggleBodyText) {
                regex = /\[htmlBodyText\]/gi;
                col = col.replace(regex, BODY_TEXT);
                regex = /\[textBodyText\]/gi;
                col = col.replace(regex, `[textBodyText_${i + 1}]`);
            } else {
                regex = /\[htmlBodyText\]/gi;
                col = col.replace(regex, "");
            }
            if (this.props.content.toggleCta) {
                regex = /\[htmlCta\]/gi;
                col = col.replace(regex, CTA);
                regex = /\[textCta\]/gi;
                col = col.replace(regex, `[textCta_${i + 1}]`);
                regex = /\[linkCta\]/gi;
                col = col.replace(regex, `[linkCta_${i + 1}]`);
            } else {
                regex = /\[htmlCta\]/gi;
                col = col.replace(regex, "");
            }

            cols += col;

            if (i + 1 < 2) {
                cols += COLUMN_SPACER;
            }
        }

        regex = /\[htmlColumn\]/gi;
        html = html.replace(regex, cols);


        // --- Add Configurations ---
        if (this.props.content.imgSrc_1 === "") {
            regex = /\[imgSrc_1\]/gi;
            html = html.replace(regex, "http://via.placeholder.com/250x250");
        }
        if (this.props.content.imgSrc_2 === "") {
            regex = /\[imgSrc_2\]/gi;
            html = html.replace(regex, "http://via.placeholder.com/250x250");
        }
        if (!this.props.content.toggleHeadlineSecondary) {
            regex = /\[textHeadlineSecondary_1\]/gi;
            html = html.replace(regex, "");
            regex = /\[textHeadlineSecondary_2\]/gi;
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
        if (this.props.content.textBodyText_1 !== undefined) {
            regex = /\[textBodyText_1\]/gi;
            html = html.replace(regex, richTextToHtml(this.props.content.textBodyText_1));
        }
        if (this.props.content.textBodyText_2 !== undefined) {
            regex = /\[textBodyText_2\]/gi;
            html = html.replace(regex, richTextToHtml(this.props.content.textBodyText_2));
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
                        toggleBodyText: true,
                        toggleCta: false,

                        // Configs
                        toggleHeadlineSecondary: true,
                        headlineSize: "small",
                        ctaStyle: "default",

                        // Inputs
                        imgSrc_1: "",
                        imgSrc_2: "",
                        textHeadline_1: "Lorem /",
                        textHeadline_2: "Lorem /",
                        textHeadlineSecondary_1: "Ipsum",
                        textHeadlineSecondary_2: "Ipsum",
                        textCta_1: "Click me",
                        textCta_2: "Click me",
                        linkCta_1: "#",
                        linkCta_2: "#",
                        textBodyText_1: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                        textBodyText_2: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
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
                            </>
                        ) : null}
                        <div className="slds-theme_shade slds-p-around_medium slds-m-top_small slds-box">
                            <div className="slds-text-heading_small slds-m-bottom_xx-small">Column 1</div>
                            {this.props.content.toggleImg ? (
                                <>
                                    <div className="slds-clearfix">
                                        <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Image URL <span style={{ color: "#0070d2" }}>- Image size: Width: 250px</span></div>
                                        <Input
                                            value={this.props.content.imgSrc_1}
                                            onChange={event => {
                                                this.onChange("imgSrc_1", event.target.value);
                                            }}
                                        />
                                    </div>
                                </>
                            ) : null}
                            {this.props.content.toggleHeadline ? (
                                <>
                                    <div className="slds-clearfix">
                                        <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Headline Text</div>
                                        {!this.props.content.toggleHeadlineSecondary ? (
                                            <>
                                                <Input
                                                    value={this.props.content.textHeadline_1}
                                                    onChange={event => {
                                                        this.onChange("textHeadline_1", event.target.value);
                                                    }}
                                                />
                                            </>
                                        ) : null}
                                        {this.props.content.toggleHeadlineSecondary ? (
                                            <>
                                                <div className="slds-float_left slds-size_3-of-7 slds-m-right_medium">
                                                    <div className="slds-text-body_small slds-text-color_weak slds-m-bottom_xx-small">part. 1</div>
                                                    <Input
                                                        value={this.props.content.textHeadline_1}
                                                        onChange={event => {
                                                            this.onChange("textHeadline_1", event.target.value);
                                                        }}
                                                    />
                                                </div>
                                                <div className="slds-float_left slds-size_3-of-7 slds-m-right_medium">
                                                    <div className="slds-text-body_small slds-text-color_weak slds-m-bottom_xx-small">part. 2</div>
                                                    <Input
                                                        value={this.props.content.textHeadlineSecondary_1}
                                                        onChange={event => {
                                                            this.onChange("textHeadlineSecondary_1", event.target.value);
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
                                        <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">CTA Text</div>
                                        <Input
                                            value={this.props.content.textCta_1}
                                            onChange={event => {
                                                this.onChange("textCta_1", event.target.value);
                                            }}
                                        />
                                        <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">CTA Link</div>
                                        <Input
                                            value={this.props.content.linkCta_1}
                                            onChange={event => {
                                                this.onChange("linkCta_1", event.target.value);
                                            }}
                                        />
                                    </div>
                                </>
                            ) : null}
                            {this.props.content.toggleBodyText ? (
                                <>
                                    <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Body Text</div>
                                    <RichTextEditor onChange={(data) => this.onChange("textBodyText_1", data)} text={this.props.content.textBodyText_1} toggleBold={false} toggleItalic={false} toggleLink={true} />
                                </>
                            ) : null}
                        </div>
                        <div className="slds-theme_shade slds-p-around_medium slds-m-top_small slds-box">
                            <div className="slds-text-heading_small slds-m-bottom_xx-small">Column 2</div>
                            {this.props.content.toggleImg ? (
                                <>
                                    <div className="slds-clearfix">
                                        <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Image URL <span style={{ color: "#0070d2" }}>- Image size: Width: 250px</span></div>
                                        <Input
                                            value={this.props.content.imgSrc_2}
                                            onChange={event => {
                                                this.onChange("imgSrc_2", event.target.value);
                                            }}
                                        />
                                    </div>
                                </>
                            ) : null}
                            {this.props.content.toggleHeadline ? (
                                <>
                                    <div className="slds-clearfix">
                                        <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Headline Text</div>
                                        {!this.props.content.toggleHeadlineSecondary ? (
                                            <>
                                                <Input
                                                    value={this.props.content.textHeadline_2}
                                                    onChange={event => {
                                                        this.onChange("textHeadline_2", event.target.value);
                                                    }}
                                                />
                                            </>
                                        ) : null}
                                        {this.props.content.toggleHeadlineSecondary ? (
                                            <>
                                                <div className="slds-float_left slds-size_3-of-7 slds-m-right_medium">
                                                    <div className="slds-text-body_small slds-text-color_weak slds-m-bottom_xx-small">part. 1</div>
                                                    <Input
                                                        value={this.props.content.textHeadline_2}
                                                        onChange={event => {
                                                            this.onChange("textHeadline_2", event.target.value);
                                                        }}
                                                    />
                                                </div>
                                                <div className="slds-float_left slds-size_3-of-7 slds-m-right_medium">
                                                    <div className="slds-text-body_small slds-text-color_weak slds-m-bottom_xx-small">part. 2</div>
                                                    <Input
                                                        value={this.props.content.textHeadlineSecondary_2}
                                                        onChange={event => {
                                                            this.onChange("textHeadlineSecondary_2", event.target.value);
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
                                        <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">CTA Text</div>
                                        <Input
                                            value={this.props.content.textCta_2}
                                            onChange={event => {
                                                this.onChange("textCta_2", event.target.value);
                                            }}
                                        />
                                        <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">CTA Link</div>
                                        <Input
                                            value={this.props.content.linkCta_2}
                                            onChange={event => {
                                                this.onChange("linkCta_2", event.target.value);
                                            }}
                                        />
                                    </div>
                                </>
                            ) : null}
                            {this.props.content.toggleBodyText ? (
                                <>
                                    <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Body Text</div>
                                    <RichTextEditor onChange={(data) => this.onChange("textBodyText_2", data)} text={this.props.content.textBodyText_2} toggleBold={false} toggleItalic={false} toggleLink={true} />
                                </>
                            ) : null}
                        </div>


                    </>
                ) : null
                }
            </Card>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);