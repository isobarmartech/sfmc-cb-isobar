import React from "react";
import {
    Card,
    IconSettings,
    RadioButtonGroup,
    Radio,
    Dropdown,
    Checkbox
} from "@salesforce/design-system-react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../core/helpers";
import { LAYOUT, INFORMATION, HYPERLINKS, UNSUBSCRIBE } from "./layouts/footer";
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


        if (this.props.content.toggleInfo) {
            html = addSpacer(html, this.props.content, ["toggleInfo"], 40, `colspan="3"`);
            regex = /\[htmlInformation\]/gi;
            html = html.replace(regex, INFORMATION);
        } else {
            html = addSpacer(html, this.props.content, true, 20, `colspan="3"`);
            regex = /\[htmlInformation\]/gi;
            html = html.replace(regex, "");
        }

        if (this.props.content.toggleHyperlinks) {
            regex = /\[htmlHyperlinks\]/gi;
            html = html.replace(regex, HYPERLINKS);
        } else {
            regex = /\[htmlHyperlinks\]/gi;
            html = html.replace(regex, "");
        }

        if (this.props.content.toggleUnsubscribe) {
            regex = /\[htmlUnsubscribe\]/gi;
            html = html.replace(regex, UNSUBSCRIBE);
        } else {
            regex = /\[htmlUnsubscribe\]/gi;
            html = html.replace(regex, "");
        }

        // --- Add configurations ---
        regex = /\[img_logo\]/gi;
        html = html.replace(regex, ui.images[this.props.content.brandId].logo.brand);

        if (this.props.content.languageSelector === "danish") {
            regex = /\[textMaps\]/gi;
            html = html.replace(regex, "Find vej");

            regex = /\[textUnsubscribe\]/gi;
            html = html.replace(regex, `Jeg ønsker ikke at modtage flere emails fra ${this.props.content.brandName}`);

        } else {
            regex = /\[textMaps\]/gi;
            html = html.replace(regex, "Find your way");

            regex = /\[textUnsubscribe\]/gi;
            html = html.replace(regex, `I wish to not receive any more emails from ${this.props.content.brandName}`);
        }

        if (this.props.content.toggleInfo && this.props.content.togglePadding) {
            regex = /\[paddingWidth\]/gi;
            html = html.replace(regex, "70");
        } else {
            regex = /\[paddingWidth\]/gi;
            html = html.replace(regex, "30");
        }

        if (this.props.content.toggleColors) {
            regex = /\[img_logo_brand\]/gi;
            html = html.replace(regex, "[img_logo_white]");

            regex = /\[colorBg\]/gi;
            html = html.replace(regex, "#000000");

            regex = /\[colorText\]/gi;
            html = html.replace(regex, "#FFFFFF");
            regex = /\[brandColor\]/gi;
            html = html.replace(regex, "#FFFFFF");

            regex = /\[unsubColorBg\]/gi;
            html = html.replace(regex, "#FFFFFF");
            regex = /\[unsubColorText\]/gi;
            html = html.replace(regex, "#000000");
        }

        if (this.props.content.citySelector) {
            regex = /\[textAddressStreet\]/gi;
            html = html.replace(regex, ui.brands[this.props.content.brandIndex].info[this.props.content.citySelector].address.street);
            regex = /\[textAddressCity\]/gi;
            html = html.replace(regex, ui.brands[this.props.content.brandIndex].info[this.props.content.citySelector].address.city);
            regex = /\[linkAddressMaps\]/gi;
            html = html.replace(regex, ui.brands[this.props.content.brandIndex].info[this.props.content.citySelector].address.maps);

            regex = /\[textPhone\]/gi;
            html = html.replace(regex, ui.brands[this.props.content.brandIndex].info[this.props.content.citySelector].phone.text);
            regex = /\[linkPhone\]/gi;
            html = html.replace(regex, ui.brands[this.props.content.brandIndex].info[this.props.content.citySelector].phone.href);
            regex = /\[linkMail\]/gi;
            html = html.replace(regex, ui.brands[this.props.content.brandIndex].info[this.props.content.citySelector].mail.href);
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
                        brandIndex: "",
                        brandColor: "",
                        primaryFont: "",

                        // Layouts
                        toggleInfo: true,
                        toggleHyperlinks: true,
                        togglePadding: false,
                        toggleColors: false,
                        toggleUnsubscribe: true,

                        // Configs
                        link_logo: "",
                        img_logo_brand: "",
                        img_logo_white: "",
                        alt_text: "",
                        img_logo_height: "30",
                        citySelector: "copenhagen",
                        languageSelector: "danish",
                        colorBg: "#FFFFFF",
                        colorText: "#000000",
                        unsubColorBg: "#000000",
                        unsubColorText: "#FFFFFF",

                        // Inputs
                        textAddressStreet: "",
                        textAddressCity: "",
                        linkAddressMaps: "",
                        textPhone: "",
                        linkPhone: "",
                        linkMail: "",
                        textUnsubscribe: "",
                        linkUnsubscribe: "#",
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
                brandIndex: `${i}`,
                brandColor: `${ui.brands[i].colors.primary}`,
                website: `${ui.brands[i].website}`,
                primaryFont: `${ui.brands[i].font.primary}`,
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
                            <img src={this.props.content.img_logo_brand} alt={this.props.content.brandName} style={{ height: "30px" }} />
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
                                            this.onChange("brandIndex", event.brandIndex);
                                            this.onChange("brandColor", event.brandColor);
                                            this.onChange("brandName", event.label);
                                            this.onChange("link_logo", event.website);
                                            this.onChange("primaryFont", event.primaryFont);
                                            this.onChange("img_logo_brand", ui.images[event.value].logo.brand);
                                            this.onChange("img_logo_white", ui.images[event.value].logo.white);
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
                                <div className="slds-text-title slds-m-bottom_xx-small">Information</div>
                                <Checkbox
                                    labels={{
                                        label: '',
                                        toggleDisabled: '',
                                        toggleEnabled: ''
                                    }}
                                    variant="toggle"
                                    checked={this.props.content.toggleInfo}
                                    onChange={(event) => {
                                        this.onChange('toggleInfo', event.target.checked)
                                    }}
                                />
                            </div>
                            <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                <div className="slds-text-title slds-m-bottom_xx-small">Hyperlinks</div>
                                <Checkbox
                                    disabled={!this.props.content.toggleInfo}
                                    labels={{
                                        label: '',
                                        toggleDisabled: '',
                                        toggleEnabled: ''
                                    }}
                                    variant="toggle"
                                    checked={!this.props.content.toggleInfo ? false : this.props.content.toggleHyperlinks}
                                    onChange={(event) => {
                                        this.onChange('toggleHyperlinks', event.target.checked)
                                    }}
                                />
                            </div>
                            <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                <div className="slds-text-title slds-m-bottom_xx-small">Padding</div>
                                <Checkbox
                                    disabled={!this.props.content.toggleInfo}
                                    labels={{
                                        label: '',
                                        toggleDisabled: '',
                                        toggleEnabled: ''
                                    }}
                                    variant="toggle"
                                    checked={!this.props.content.toggleInfo ? false : this.props.content.togglePadding}
                                    onChange={(event) => {
                                        this.onChange('togglePadding', event.target.checked)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="slds-clearfix">
                            <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                <div className="slds-text-title slds-m-bottom_xx-small">Invert Colors</div>
                                <Checkbox
                                    labels={{
                                        label: '',
                                        toggleDisabled: '',
                                        toggleEnabled: ''
                                    }}
                                    variant="toggle"
                                    checked={this.props.content.toggleColors}
                                    onChange={(event) => {
                                        this.onChange('toggleColors', event.target.checked)
                                    }}
                                />
                            </div>
                            <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                <div className="slds-text-title slds-m-bottom_xx-small">Unsubscribe</div>
                                <Checkbox
                                    labels={{
                                        label: '',
                                        toggleDisabled: '',
                                        toggleEnabled: ''
                                    }}
                                    variant="toggle"
                                    checked={this.props.content.toggleUnsubscribe}
                                    onChange={(event) => {
                                        this.onChange('toggleUnsubscribe', event.target.checked)
                                    }}
                                />
                            </div>
                        </div>
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
                        {this.props.content.toggleInfo ? (
                            <>
                                <div className="slds-clearfix">
                                    <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                        <div className="slds-text-title slds-m-bottom_xx-small">City</div>
                                        <RadioButtonGroup
                                            onChange={event => {
                                                this.onChange("citySelector", event.target.value);
                                            }}
                                        >
                                            <Radio
                                                label="Copenhagen"
                                                variant="button-group"
                                                value="copenhagen"
                                                checked={this.props.content.citySelector === "copenhagen"}
                                            ></Radio>
                                            <Radio
                                                label="Aarhus"
                                                variant="button-group"
                                                value="aarhus"
                                                checked={this.props.content.citySelector === "aarhus"}
                                            ></Radio>
                                        </RadioButtonGroup>
                                    </div>
                                </div>
                            </>
                        ) : null}
                        {(this.props.content.toggleHyperlinks && this.props.content.toggleInfo) || this.props.content.toggleUnsubscribe ? (
                            <>
                                <div className="slds-clearfix">
                                    <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                        <div className="slds-text-title slds-m-bottom_xx-small">Language</div>
                                        <RadioButtonGroup
                                            onChange={event => {
                                                this.onChange("languageSelector", event.target.value);
                                            }}
                                        >
                                            <Radio
                                                label="Danish"
                                                variant="button-group"
                                                value="danish"
                                                checked={this.props.content.languageSelector === "danish"}
                                            ></Radio>
                                            <Radio
                                                label="English"
                                                variant="button-group"
                                                value="english"
                                                checked={this.props.content.languageSelector === "english"}
                                            ></Radio>
                                        </RadioButtonGroup>
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