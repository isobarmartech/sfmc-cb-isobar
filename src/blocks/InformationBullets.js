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
import { LAYOUT_2, LAYOUT_3, INTRO } from "./layouts/informationBullets";
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
        let html = LAYOUT_2;



        // --- Build Layout ---

        if (this.props.content.columnAmount === "3") {
            html = LAYOUT_3;
        }
        if (this.props.content.toggleIntro) {
            regex = /\[htmlIntro\]/gi;
            html = html.replace(regex, INTRO);
        } else {
            regex = /\[htmlIntro\]/gi;
            html = html.replace(regex, "");
        }


        // --- Add Configurations ---

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
                        toggleIntro: true,

                        // Configs
                        columnAmount: "3",
                        imgBullet: "",

                        // Inputs
                        textIntro: "Lorem ipsum dolor sit amet",
                        textHeadline_1: "Lorem ipsum",
                        textHeadline_2: "Lorem ipsum",
                        textHeadline_3: "Lorem ipsum",
                        textBodyText_1: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum dignissimos molestiae quibusdam",
                        textBodyText_2: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum dignissimos molestiae quibusdam",
                        textBodyText_3: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum dignissimos molestiae quibusdam",
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
                        <div className="slds-clearfix">
                            <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                <div className="slds-text-title slds-m-bottom_xx-small">Intro</div>
                                <Checkbox
                                    labels={{
                                        label: '',
                                        toggleDisabled: '',
                                        toggleEnabled: ''
                                    }}
                                    variant="toggle"
                                    checked={this.props.content.toggleIntro}
                                    onChange={(event) => { this.onChange('toggleIntro', event.target.checked) }}
                                />
                            </div>
                        </div>
                        <div className="slds-clearfix">
                            <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                <div className="slds-text-title">Column Amount</div>
                                <RadioButtonGroup
                                    onChange={event => {
                                        this.onChange("columnAmount", event.target.value);
                                    }}
                                >
                                    <Radio
                                        label="Two Columns"
                                        variant="button-group"
                                        value="2"
                                        checked={this.props.content.columnAmount === "2"}
                                    ></Radio>
                                    <Radio
                                        label="Three Columns"
                                        variant="button-group"
                                        value="3"
                                        checked={this.props.content.columnAmount === "3"}
                                    ></Radio>
                                </RadioButtonGroup>
                            </div>
                        </div>
                        {this.props.content.toggleIntro ? (
                            <div className="slds-clearfix">
                                <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Intro Text</div>
                                <Input
                                    value={this.props.content.textIntro}
                                    onChange={event => {
                                        this.onChange("textIntro", event.target.value);
                                    }}
                                />
                            </div>
                        ) : null}
                        <div className="slds-theme_shade slds-p-around_medium slds-m-top_small slds-box">
                            <div className="slds-text-heading_small slds-m-bottom_xx-small">Column 1</div>
                            <div className="slds-clearfix">
                                <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Headline 1</div>
                                <Input
                                    value={this.props.content.textHeadline_1}
                                    onChange={event => {
                                        this.onChange("textHeadline_1", event.target.value);
                                    }}
                                />
                                <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Body Text 1</div>
                                <RichTextEditor onChange={(data) => this.onChange("textBodyText_1", data)} text={this.props.content.textBodyText_1} toggleBold={false} toggleItalic={false} toggleLink={true} />
                            </div>
                        </div>
                        <div className="slds-theme_shade slds-p-around_medium slds-m-top_small slds-box">
                            <div className="slds-text-heading_small slds-m-bottom_xx-small">Column 2</div>
                            <div className="slds-clearfix">
                                <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Headline 2</div>
                                <Input
                                    value={this.props.content.textHeadline_2}
                                    onChange={event => {
                                        this.onChange("textHeadline_2", event.target.value);
                                    }}
                                />
                                <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Body Text 2</div>
                                <RichTextEditor onChange={(data) => this.onChange("textBodyText_2", data)} text={this.props.content.textBodyText_2} toggleBold={false} toggleItalic={false} toggleLink={true} />
                            </div>
                        </div>
                        {this.props.content.columnAmount === "3" ? (
                            <div className="slds-theme_shade slds-p-around_medium slds-m-top_small slds-box">
                                <div className="slds-text-heading_small slds-m-bottom_xx-small">Column 3</div>
                                <div className="slds-clearfix">
                                    <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Headline 3</div>
                                    <Input
                                        value={this.props.content.textHeadline_3}
                                        onChange={event => {
                                            this.onChange("textHeadline_3", event.target.value);
                                        }}
                                    />
                                    <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Body Text 3</div>
                                    <RichTextEditor onChange={(data) => this.onChange("textBodyText_3", data)} text={this.props.content.textBodyText_3} toggleBold={false} toggleItalic={false} toggleLink={true} />
                                </div>
                            </div>
                        ) : null}
                    </>
                ) : null
                }
            </Card>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);