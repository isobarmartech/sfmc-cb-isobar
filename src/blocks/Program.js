import React from "react";
import {
    Card,
    Input,
    IconSettings,
    Dropdown,
    Slider,
    Checkbox,
    RadioButtonGroup,
    Radio
} from "@salesforce/design-system-react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../core/helpers";
import { LAYOUT, SINGLE_EVENT, SUBHEADLINE, SIGNUP_BOX, BODY_TEXT, CTA } from "./layouts/program";
import { ui } from "../constants/ui.js";

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

        let events = SINGLE_EVENT;
        for (let i = 1; i <= this.props.content.eventAmount; i++) {
            if (this.props.content[`textTime_${i}`] && this.props.content[`textTime_${i}`].length > 0) {
                regex = /\[textTime\]/gi;
                events = events.replace(regex, `[textTime_${i}]`);
            } else {
                regex = /\[textTime\]/gi;
                events = events.replace(regex, `00:00`);
            }

            if (this.props.content[`textHeadline_${i}`] && this.props.content[`textHeadline_${i}`].length > 0) {
                regex = /\[textHeadline\]/gi;
                events = events.replace(regex, `[textHeadline_${i}]`);
            } else {
                regex = /\[textHeadline\]/gi;
                events = events.replace(regex, `Name Nameson`);
            }

            if (this.props.content[`textSubheadline_${i}`] && this.props.content[`textSubheadline_${i}`].length > 0) {
                regex = /\[htmlSubheadline\]/gi;
                events = events.replace(regex, SUBHEADLINE);
                regex = /\[textSubheadline\]/gi;
                events = events.replace(regex, `[textSubheadline_${i}]`);
            } else {
                regex = /\[htmlSubheadline\]/gi;
                events = events.replace(regex, "");
            }

            if (i + 1 <= this.props.content.eventAmount) {
                events += SINGLE_EVENT;
            }
        }
        regex = /\[htmlEvents\]/gi;
        html = html.replace(regex, events);


        if (this.props.content.toggleBodyText || this.props.content.toggleCta) {
            regex = /\[htmlSignupBox\]/gi;
            html = html.replace(regex, SIGNUP_BOX);
        } else {
            regex = /\[htmlSignupBox\]/gi;
            html = html.replace(regex, "");
        }

        if (this.props.content.toggleBodyText) {
            regex = /\[htmlBodyText\]/gi;
            html = html.replace(regex, BODY_TEXT);
        } else {
            regex = /\[htmlBodyText\]/gi;
            html = html.replace(regex, "");
        }

        if (this.props.content.toggleCta) {
            regex = /\[htmlCta\]/gi;
            html = html.replace(regex, CTA);
        } else {
            regex = /\[htmlCta\]/gi;
            html = html.replace(regex, "");
        }


        // --- Add Configurations ---
        if (this.props.content.ctaStyle === "outline") {
            regex = /\[ctaColorPrimary\]/gi;
            html = html.replace(regex, "#FFFFFF");
            regex = /\[ctaColorSecondary\]/gi;
            html = html.replace(regex, "[brandColor]");
        } else if (this.props.content.ctaStyle === "default") {
            regex = /\[ctaColorPrimary\]/gi;
            html = html.replace(regex, "[brandColor]");
            regex = /\[ctaColorSecondary\]/gi;
            html = html.replace(regex, "#FFFFFF");
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
                        toggleBodyText: true,
                        toggleCta: true,

                        // Configs
                        eventAmount: "3",
                        ctaStyle: "outline",

                        // Inputs
                        textIntro: "Program",
                        textBody_black: "Lorem ipsum",
                        textBody_white: "dolor sit amet, consectetur adipiscing elit. Etiam semper dolor nisi, non viverra magna viverra quis. Aenean vitae elementum odio, quis auctor ante. Duis faucibus semper nunc, in gravida sapien ultrices sed. Cras convallis dolor neque, quis dapibus enim malesuada id.",
                        textCta: "Sign up now",
                        linkCta: "#",
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

        let events = [];
        for (let i = 1; i <= this.props.content.eventAmount; i++) {
            let lay = (<div className="slds-theme_shade slds-p-around_medium slds-m-top_small slds-box">
                <div className="slds-text-heading_small slds-m-bottom_xx-small">Event {i}</div>
                <div className="slds-clearfix">
                    <div className="slds-float_left slds-size_1-of-5 slds-m-right_small">
                        <div className="slds-text-title slds-m-top_xx-small slds-m-bottom_xx-small">Time</div>
                        <Input
                            placeholder="00:00"
                            value={this.props.content[`textTime_${i}`]}
                            onChange={event => {
                                this.onChange(`textTime_${i}`, event.target.value);
                            }}
                        />
                    </div>
                    <div className="slds-float_left slds-size_1-of-3 slds-m-right_small">
                        <div className="slds-text-title slds-m-top_xx-small slds-m-bottom_xx-small">Headline</div>
                        <Input
                            placeholder="Name Nameson"
                            value={this.props.content[`textHeadline_${i}`]}
                            onChange={event => {
                                this.onChange(`textHeadline_${i}`, event.target.value);
                            }}
                        />
                    </div>
                    <div className="slds-float_left slds-size_3-of-8">
                        <div className="slds-text-title slds-m-top_xx-small slds-m-bottom_xx-small">Subheadline</div>
                        <Input
                            placeholder="Description"
                            value={this.props.content[`textSubheadline_${i}`]}
                            onChange={event => {
                                this.onChange(`textSubheadline_${i}`, event.target.value);
                            }}
                        />
                    </div>
                </div>
            </div>
            )
            events.push(lay)
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
                        <div className="slds-clearfix">
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
                            <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Intro Text</div>
                            <Input
                                value={this.props.content.textIntro}
                                onChange={event => {
                                    this.onChange("textIntro", event.target.value);
                                }}
                            />
                        </div>
                        <div className="slds-text-title slds-m-top_small">Event Amount</div>
                        <Slider
                            value={this.props.content.eventAmount}
                            min={1}
                            max={6}
                            step={1}
                            onChange={event => {
                                this.onChange("eventAmount", event.target.value);
                            }}
                        />
                        {/* EVENTS */}
                        {events}
                        {this.props.content.toggleBodyText ? (
                            <>
                                <div className="slds-clearfix">
                                    <div className="slds-float_left slds-size_2-of-7 slds-m-right_medium">
                                        <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Black Body Text</div>
                                        <Input
                                            value={this.props.content.textBody_black}
                                            onChange={event => {
                                                this.onChange("textBody_black", event.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="slds-float_left slds-size_4-of-7 slds-m-right_medium">
                                        <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">White Body Text</div>
                                        <Input
                                            value={this.props.content.textBody_white}
                                            onChange={event => {
                                                this.onChange("textBody_white", event.target.value);
                                            }}
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
                    </>
                ) : null
                }
            </Card>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);