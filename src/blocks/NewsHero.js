import React from "react";
import {
    Card,
    Input,
    ColorPicker,
    RadioButtonGroup,
    Radio,
    Checkbox,
    IconSettings,
    Dropdown
} from "@salesforce/design-system-react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../core/helpers";
import { LAYOUT, IMAGE, TRUMPET, HEADLINE, TEASER, IMAGE_SPACER } from "./layouts/newsHero";
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

        if (this.props.content.toggleImage) {
            regex = /\[imageHtml\]/gi;
            html = html.replace(regex, IMAGE);
            if (this.props.content.toggleTrumpet || this.props.content.toggleHeadline || this.props.content.toggleTeaser) {
                regex = /\[imageSpacerHtml\]/gi;
                html = html.replace(regex, IMAGE_SPACER);
            } else {
                regex = /\[imageSpacerHtml\]/gi;
                html = html.replace(regex, "");
            }
        } else {
            regex = /\[imageHtml\]/gi;
            html = html.replace(regex, "");
        }

        if (this.props.content.toggleTrumpet) {
            regex = /\[trumpetHtml\]/gi;
            html = html.replace(regex, TRUMPET);
        } else {
            regex = /\[trumpetHtml\]/gi;
            html = html.replace(regex, "");
        }

        if (this.props.content.toggleHeadline) {
            regex = /\[headlineHtml\]/gi;
            html = html.replace(regex, HEADLINE);
        } else {
            regex = /\[headlineHtml\]/gi;
            html = html.replace(regex, "");
        }

        if (this.props.content.headlineSize !== undefined) {
            regex = /\[headlineFontsize\]/gi;
            html = html.replace(regex, ui.components.headline[this.props.content.headlineSize].fontsize);
            regex = /\[headlineLineheight\]/gi;
            html = html.replace(regex, ui.components.headline[this.props.content.headlineSize].lineheight);
            regex = /\[headlineMobileClass\]/gi;
            html = html.replace(regex, ui.components.headline[this.props.content.headlineSize].mobileClass);

        }

        if (this.props.content.toggleTeaser) {
            regex = /\[teaserHtml\]/gi;
            html = html.replace(regex, TEASER);
        } else {
            regex = /\[teaserHtml\]/gi;
            html = html.replace(regex, "");
        }

        // Handle Rich Text Input
        if (this.props.content.textHeadline !== undefined) {
            regex = /\[textHeadline\]/gi;
            html = html.replace(regex, richTextToHtml(this.props.content.textHeadline));
        }
        if (this.props.content.textTeaser !== undefined) {
            regex = /\[textTeaser\]/gi;
            html = html.replace(regex, richTextToHtml(this.props.content.textTeaser));
        }

        // In case we have a working color
        if (this.props.content.themeWorkingColor) {
            regex = /\[themeColor\]/gi;
            html = html.replace(regex, this.props.content.themeWorkingColor);
        }

        // Auto version
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
                        linkArticle: "#",
                        toggleImage: true,
                        toggleTrumpet: true,
                        toggleHeadline: true,
                        toggleTeaser: true,
                        themeColor: "",
                        image: "https://via.placeholder.com/600x300",
                        textTrumpet: "Lorem ipsum 2020",
                        textHeadline: "Lorem ipsum dolor sit amet consectetur",
                        headlineSize: "h1",
                        headlineFontsize: "",
                        headlineLineheight: "",
                        headlineMobileClass: "",
                        textTeaser: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus minima quas est, unde itaque ullam ipsum maiores provident nihil ratione eius earum nemo fuga, rem veniam.",
                        brandName: "Select Brand",
                        colorSwatches: ""
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
                brandColor: `${ui.brands[i].colors[0]}`,
                swatches: ui.brands[i].colors
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
                        <h1 className="slds-text-heading_large">{this.props.content.brandName}</h1>
                        <IconSettings iconPath="/assets/icons">
                            <div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center slds-m-top_small">
                                <div className="slds-col_padded">
                                    <span>Change brand </span>
                                    <Dropdown
                                        length={null}
                                        iconCategory="utility"
                                        iconName="down"
                                        iconVariant="border-filled"
                                        onSelect={event => {
                                            this.onChange("themeColor", event.brandColor);
                                            this.onChange("brandName", event.label);
                                            this.onChange("colorSwatches", event.swatches);
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
                        <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Article Link</div>
                        <Input
                            value={this.props.content.linkArticle}
                            onChange={event => {
                                this.onChange("linkArticle", event.target.value);
                            }}
                        />
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
                                    checked={this.props.content.toggleImage}
                                    onChange={(event) => { this.onChange('toggleImage', event.target.checked) }}
                                />
                            </div>
                            <div className="slds-float_left slds-m-right_medium slds-m-top_small">
                                <div className="slds-text-title slds-m-bottom_xx-small">Trumpet</div>
                                <Checkbox
                                    labels={{
                                        label: '',
                                        toggleDisabled: '',
                                        toggleEnabled: ''
                                    }}
                                    variant="toggle"
                                    checked={this.props.content.toggleTrumpet}
                                    onChange={(event) => { this.onChange('toggleTrumpet', event.target.checked) }}
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
                                <div className="slds-text-title slds-m-bottom_xx-small">Teaser</div>
                                <Checkbox
                                    labels={{
                                        label: '',
                                        toggleDisabled: '',
                                        toggleEnabled: ''
                                    }}
                                    variant="toggle"
                                    checked={this.props.content.toggleTeaser}
                                    onChange={(event) => { this.onChange('toggleTeaser', event.target.checked) }}
                                />
                            </div>
                        </div>
                        <div className="slds-m-top_small">
                            <div className="slds-text-title slds-m-bottom_xx-small">Theme Color</div>
                            <ColorPicker
                                hideInput={true}
                                swatchColors={this.props.content.colorSwatches}
                                value={this.props.content.themeColor}
                                valueWorking={this.props.content.themeColor}
                                variant={"swatches"}
                                events={{
                                    onChange: (event, data) => {
                                        this.onChange("themeColor", data.color);
                                    },
                                    onWorkingColorChange: (event, data) => {
                                        this.onChange(
                                            "themeWorkingColor",
                                            data.color.hex
                                        );
                                    }
                                }}
                                onClose={() =>
                                    this.onChange("themeWorkingColor", undefined)
                                }
                            />
                        </div>
                        {this.props.content.toggleImage ? (
                            <>
                                <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Image URL <span style={{ color: "#0070d2" }}>- Image size: 600px width</span></div>
                                <Input
                                    value={this.props.content.image}
                                    onChange={event => {
                                        this.onChange("image", event.target.value);
                                    }}
                                />
                            </>
                        ) : null}
                        {this.props.content.toggleTrumpet ? (
                            <>
                                <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Trumpet Text</div>
                                <Input
                                    value={this.props.content.textTrumpet}
                                    onChange={event => {
                                        this.onChange("textTrumpet", event.target.value);
                                    }}
                                />
                            </>
                        ) : null}
                        {this.props.content.toggleHeadline ? (
                            <>
                                <div className="slds-text-title slds-m-top_small">Headline size</div>
                                <RadioButtonGroup
                                    onChange={event => {
                                        this.onChange("headlineSize", event.target.value);
                                    }}
                                >
                                    <Radio
                                        label="H1"
                                        variant="button-group"
                                        value="h1"
                                        checked={this.props.content.headlineSize === "h1"}
                                    ></Radio>
                                    <Radio
                                        label="H2"
                                        variant="button-group"
                                        value="h2"
                                        checked={this.props.content.headlineSize === "h2"}
                                    ></Radio>
                                </RadioButtonGroup>
                                <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Headline Text</div>
                                <RichTextEditor onChange={(data) => this.onChange("textHeadline", data)} text={this.props.content.textHeadline} toggleBold={false} toggleItalic={true} toggleLink={false} />
                            </>
                        ) : null}
                        {this.props.content.toggleTeaser ? (
                            <>
                                <div className="slds-text-title slds-m-top_small slds-m-bottom_xx-small">Teaser Text</div>
                                <RichTextEditor onChange={(data) => this.onChange("textTeaser", data)} text={this.props.content.textTeaser} toggleBold={true} toggleItalic={true} toggleLink={false} />
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