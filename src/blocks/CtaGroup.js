import React from "react";
import {
    Card,
    Input,
    IconSettings,
    Dropdown,
    Slider,
    RadioButtonGroup,
    Radio
} from "@salesforce/design-system-react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../core/helpers";
import { LAYOUT, CTA_BUTTON, CTA_LINK } from "./layouts/ctaGroup";
import { ui } from "../constants/ui.js";
import { addSpacer } from "../components/AddSpacer";

var SDK = require("blocksdk");
var sdk = new SDK();

class Module extends React.Component {
    onChange = (element, value) => {
        this.props.editContent(element, value);
    };

    setContent = () => {
        let pattern, regex;
        let html = LAYOUT;

        // --- Build Layout ---

        let ctaList = "";
        for (let i = 1; i <= this.props.content.ctaAmount; i++) {
            if (this.props.content[`ctaStyle_${i}`] === "default") {
                ctaList += CTA_BUTTON
                regex = /\[ctaColorPrimary\]/gi;
                ctaList = ctaList.replace(regex, "[brandColor]");
                regex = /\[ctaColorSecondary\]/gi;
                ctaList = ctaList.replace(regex, "#FFFFFF");
            } else if (this.props.content[`ctaStyle_${i}`] === "outline") {
                ctaList += CTA_BUTTON
                regex = /\[ctaColorPrimary\]/gi;
                ctaList = ctaList.replace(regex, "#FFFFFF");
                regex = /\[ctaColorSecondary\]/gi;
                ctaList = ctaList.replace(regex, "[brandColor]");
            } else if (this.props.content[`ctaStyle_${i}`] === "textlink") {
                ctaList += CTA_LINK
                regex = /\[ctaColorPrimary\]/gi;
                ctaList = ctaList.replace(regex, "[brandColor]");
            }
            regex = /\[textCta\]/gi;
            ctaList = ctaList.replace(regex, `[textCta_${i}]`);
            regex = /\[linkCta\]/gi;
            ctaList = ctaList.replace(regex, `[linkCta_${i}]`);
            if ((i + 1) <= this.props.content.ctaAmount) {
                ctaList = addSpacer(ctaList, this.props.content, ["toggleCta"], 20, `colspan="3"`);
            } else {
                ctaList = addSpacer(ctaList, "none");
            }
        }
        regex = /\[htmlCta\]/gi;
        html = html.replace(regex, ctaList);

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
                        toggleBodyText: true,
                        toggleCta: true,

                        // Configs
                        ctaAmount: "3",
                        ctaStyle_1: "default",
                        ctaStyle_2: "outline",
                        ctaStyle_3: "textlink",

                        // Inputs
                        textCta_1: "Option 1",
                        textCta_2: "Option 2",
                        textCta_3: "Option 3",
                        linkCta_1: "#",
                        linkCta_2: "#",
                        linkCta_3: "#",
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
                                            this.onChange("imgBullet", ui.images[event.value].bullet);
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
                        <div className="slds-text-title slds-m-top_small">CTA Amount</div>
                        <Slider
                            value={this.props.content.ctaAmount}
                            min={1}
                            max={3}
                            step={1}
                            onChange={event => {
                                this.onChange("ctaAmount", event.target.value);
                            }}
                        />
                        <div className="slds-theme_shade slds-p-around_medium slds-m-top_small slds-box">
                            <div className="slds-text-heading_small slds-m-bottom_small">CTA 1</div>
                            <div className="slds-clearfix">
                                <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Style</div>
                                <RadioButtonGroup
                                    onChange={event => {
                                        this.onChange("ctaStyle_1", event.target.value);
                                    }}
                                >
                                    <Radio
                                        label="Default"
                                        variant="button-group"
                                        value="default"
                                        checked={this.props.content.ctaStyle_1 === "default"}
                                    ></Radio>
                                    <Radio
                                        label="Outline"
                                        variant="button-group"
                                        value="outline"
                                        checked={this.props.content.ctaStyle_1 === "outline"}
                                    ></Radio>
                                    <Radio
                                        label="Textlink"
                                        variant="button-group"
                                        value="textlink"
                                        checked={this.props.content.ctaStyle_1 === "textlink"}
                                    ></Radio>
                                </RadioButtonGroup>
                            </div>
                            <div className="slds-clearfix">
                                <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Text</div>
                                <Input
                                    value={this.props.content.textCta_1}
                                    onChange={event => {
                                        this.onChange("textCta_1", event.target.value);
                                    }}
                                />
                                <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Link</div>
                                <Input
                                    value={this.props.content.linkCta_1}
                                    onChange={event => {
                                        this.onChange("linkCta_1", event.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        {this.props.content.ctaAmount >= "2" ? (
                            <>
                                <div className="slds-theme_shade slds-p-around_medium slds-m-top_small slds-box">
                                    <div className="slds-text-heading_small slds-m-bottom_small">CTA 2</div>
                                    <div className="slds-clearfix">
                                        <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Style</div>
                                        <RadioButtonGroup
                                            onChange={event => {
                                                this.onChange("ctaStyle_2", event.target.value);
                                            }}
                                        >
                                            <Radio
                                                label="Default"
                                                variant="button-group"
                                                value="default"
                                                checked={this.props.content.ctaStyle_2 === "default"}
                                            ></Radio>
                                            <Radio
                                                label="Outline"
                                                variant="button-group"
                                                value="outline"
                                                checked={this.props.content.ctaStyle_2 === "outline"}
                                            ></Radio>
                                            <Radio
                                                label="Textlink"
                                                variant="button-group"
                                                value="textlink"
                                                checked={this.props.content.ctaStyle_2 === "textlink"}
                                            ></Radio>
                                        </RadioButtonGroup>
                                    </div>
                                    <div className="slds-clearfix">
                                        <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Text</div>
                                        <Input
                                            value={this.props.content.textCta_2}
                                            onChange={event => {
                                                this.onChange("textCta_2", event.target.value);
                                            }}
                                        />
                                        <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Link</div>
                                        <Input
                                            value={this.props.content.linkCta_2}
                                            onChange={event => {
                                                this.onChange("linkCta_2", event.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : null}
                        {this.props.content.ctaAmount >= "3" ? (
                            <>
                                <div className="slds-theme_shade slds-p-around_medium slds-m-top_small slds-box">
                                    <div className="slds-text-heading_small slds-m-bottom_small">CTA 3</div>
                                    <div className="slds-clearfix">
                                        <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Style</div>
                                        <RadioButtonGroup
                                            onChange={event => {
                                                this.onChange("ctaStyle_3", event.target.value);
                                            }}
                                        >
                                            <Radio
                                                label="Default"
                                                variant="button-group"
                                                value="default"
                                                checked={this.props.content.ctaStyle_3 === "default"}
                                            ></Radio>
                                            <Radio
                                                label="Outline"
                                                variant="button-group"
                                                value="outline"
                                                checked={this.props.content.ctaStyle_3 === "outline"}
                                            ></Radio>
                                            <Radio
                                                label="Textlink"
                                                variant="button-group"
                                                value="textlink"
                                                checked={this.props.content.ctaStyle_3 === "textlink"}
                                            ></Radio>
                                        </RadioButtonGroup>
                                    </div>
                                    <div className="slds-clearfix">
                                        <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Text</div>
                                        <Input
                                            value={this.props.content.textCta_3}
                                            onChange={event => {
                                                this.onChange("textCta_3", event.target.value);
                                            }}
                                        />
                                        <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Link</div>
                                        <Input
                                            value={this.props.content.linkCta_3}
                                            onChange={event => {
                                                this.onChange("linkCta_3", event.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </>
                ) : null
                }
            </Card>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Module);