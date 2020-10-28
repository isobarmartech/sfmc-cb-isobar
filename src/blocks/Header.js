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
import { LAYOUT, LAYOUT_ISO_ME } from "./layouts/header";
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

        if (this.props.content.toggleME && this.props.content.brandName === "Isobar") {
            regex = /\[gifHtml\]/gi;
            html = LAYOUT_ISO_ME;
        }

        regex = /\[img_logo\]/gi;
        html = html.replace(regex, ui.images[this.props.content.brandId].logo.brand);


        // Auto version
        let keys = Object.keys(this.props.content);
        for (let i = 0; i < keys.length; i++) {
            pattern = `\\[${keys[i]}\\]`;
            html = html.replace(
                new RegExp(pattern, "gi"),
                this.props.content[keys[i]]
            );
        }

        regex = /_#(?=\w{6}\.png)/gi;
        html = html.replace(regex, "_");

        sdk.setContent(html);
    };

    componentDidMount = () => {
        sdk.getData(data => {
            if (data && Object.keys(data).length > 0) {
                this.props.initFromSaved(data);
            } else {
                this.props.initFromSaved({
                    content: {
                        brandName: "Select Brand",
                        brandId: "",
                        brandColor: "",
                        primaryFont: "",
                        toggleME: false,
                        img_logo: "",
                        alt_text: "",
                        img_logo_height: "30",
                        img_ME_icon: "https://assets.prod.ibn.host/Isobar/Morning_Essentials/morning_essentials_icon.png",
                        text_ME: "Morning Essentials"
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
                brandColor: `${ui.brands[i].colors.primary}`
            })
        }

        console.log(arr)
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
                            <>
                                <h1 className="slds-text-heading_large">{this.props.content.brandName}</h1>
                            </>
                        ) : null}
                        {this.props.content.brandId !== "" ? (
                            <>
                                <img src={this.props.content.img_logo} alt={this.props.content.brandName} style={{ height: "30px" }} />
                            </>
                        ) : null}
                        <IconSettings iconPath="/assets/icons">
                            <div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center slds-m-top_small">
                                <div className="slds-col_padded">
                                    <span>Change brand</span>
                                    <Dropdown
                                        length={null}
                                        iconCategory="utility"
                                        iconName="down"
                                        iconVariant="border-filled"
                                        onSelect={event => {
                                            this.onChange("brandId", event.value);
                                            this.onChange("brandColor", event.brandColor);
                                            this.onChange("brandName", event.label);
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
                                <div className="slds-text-title slds-m-bottom_xx-small">Logo size</div>
                                <RadioButtonGroup
                                    onChange={event => {
                                        this.onChange("img_logo_height", event.target.value);
                                    }}
                                >
                                    <Radio
                                        label="Small"
                                        variant="button-group"
                                        value="20"
                                        checked={this.props.content.img_logo_height === "20"}
                                    ></Radio>
                                    <Radio
                                        label="Default"
                                        variant="button-group"
                                        value="30"
                                        checked={this.props.content.img_logo_height === "30"}
                                    ></Radio>
                                </RadioButtonGroup>
                            </div>
                        </div>
                        {this.props.content.brandId === "iso" ? (
                            <>
                                <div className="slds-clearfix">
                                    <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                        <div className="slds-text-title slds-m-bottom_xx-small">Morning Essentials</div>
                                        <Checkbox
                                            labels={{
                                                label: '',
                                                toggleDisabled: '',
                                                toggleEnabled: ''
                                            }}
                                            variant="toggle"
                                            checked={this.props.content.toggleME}
                                            onChange={(event) => { this.onChange('toggleME', event.target.checked) }}
                                        />
                                    </div>
                                </div>
                                {this.props.content.toggleME ? (
                                    <>
                                        <div className="slds-clearfix">
                                            <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Morning Essentials Icon URL</div>
                                            <Input
                                                value={this.props.content.img_ME_icon}
                                                onChange={event => {
                                                    this.onChange("img_ME_icon", event.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="slds-clearfix">
                                            <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Morning Essentials Text</div>
                                            <Input
                                                value={this.props.content.text_ME}
                                                onChange={event => {
                                                    this.onChange("text_ME", event.target.value);
                                                }}
                                            />
                                        </div>
                                    </>
                                ) : null}
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