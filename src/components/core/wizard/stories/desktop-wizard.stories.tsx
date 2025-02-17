import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import Button from '../../button/button';
import DesktopWizard, { DesktopWizardProps } from '../desktop-wizard';
import { test_steps } from './steps/steps-data';

export default {
    title: 'DesktopWizard',
    component: DesktopWizard,
    parameters: { controls: { sort: 'alpha' } },
    argTypes: {
        dark: {
            description: 'Optional. If set to `true`, the wizard will be set to dark theme.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: false },
            },
        },
        has_dark_background: {
            description:
                'Optional. If set to false`, the wizard will be displayed without dark background surrounding it.',
            defaultValue: true,
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: true },
            },
        },
        onComplete: {
            description:
                'Required. A callback triggered on the last step and used to send collected data to a parent together with the clicked button name providing opportunity to choose what to do with the received data depending on the button. ' +
                'Data object contains values collected for each step index starting with 0, e.g.: {"0":{"selected_product":"multipliers"},"1":{"selected_app":"real_mt5_financial"},"2":{"wallet_name":"BTC"}, ...}. ' +
                'Collected values are the values you submit using onSubmit() inside child components that you add to the steps as main content or right panel content.',
            table: {
                type: { summary: '(data: { [key: string]: { [key: string]: unknown } }, button_name: string) => void' },
            },
        },
        onClose: {
            description: 'Required. A callback used to inform a parent that the wizard has been closed.',
            table: {
                type: { summary: '() => void' },
            },
        },
        steps: {
            description: `Required. An array of objects containing the list of steps to render in the wizard. Please refer to the acceptable type below. Please note that right_panel_content.lower_block is absolutely positioned against the right panel bottom.
                Below are also mentioned the types of child components' props.`,
            table: {
                type: {
                    summary: `**STEPS: ** Array<{
                        step_title: string;
                        toggle_switcher?: {
                            component: (props: ToggleSwitcherProps) => JSX.Element;
                            defaultValue: string;
                            button_labels?: string[];
                        };
                        main_content?: {
                            component: (props: MainComponentProps) => JSX.Element;
                            header?: string;
                            subheader?: string;
                            props_to_pass_through_wizard?: string[];
                        }
                        more_details?: {
                            [key: string]: {
                                header?: string;
                                subheader?: string;
                            };
                        };
                        right_panel_content?: {
                            upper_block?: (props: RightPanelComponentProps) => JSX.Element;
                            middle_block?: (props: RightPanelComponentProps) => JSX.Element;
                            lower_block?: (props: RightPanelComponentProps) => JSX.Element;
                        };
                        is_fullwidth?: boolean;
                        cancel_button_name?: string;
                        submit_button_name?: string;
                    }>
                    **PROPS_TO_PASS_THROUGH_WIZARD: ** an array of any DesktopWizard props that you want to pass to Wizard's main_content.component.
                    **MAIN COMPONENT PROPS: ** PROPS_TO_PASS_THROUGH_WIZARD + {
                        dark?: boolean;
                        more_details_type?: string;
                        onSubmit: (
                            values?: { [key: string]: unknown },
                            steps_disabling_params?: Array<{ step_title: string; should_be_disabled: boolean }>,
                        ) => void;
                        setMoreDetailsType?: (more_details_type: string) => void;
                        values?: { [key: string]: unknown };
                        selected_toggle_value?: string;
                    };
                    **RIGHT PANEL COMPONENT PROPS: ** {
                        data: { [key: string]: { [key: string]: unknown } };
                        dark?: boolean;
                        current_step_index: number;
                    };
                    **TOGGLE SWITCHER PROPS: ** {
                        button_labels?: string[];
                        dark?: boolean;
                        defaultValue: string;
                        onToggle: (value: string) => void;
                    };`,
                },
                defaultValue: { summary: '[{...}]' },
            },
        },
        wizard_title: {
            description: 'Optional. Sets the wizard title.',
            defaultValue: "Let's get you a new app.",
            table: {
                type: { summary: 'string | undefined' },
                defaultValue: { summary: "Let's get you a new app." },
            },
            control: {
                type: 'select',
                options: [
                    "Let's get you a new app.",
                    "Let's get you a new wallet.",
                    "Let's get you a new Deriv MT5 Synthetics app in new region.",
                ],
            },
        },
    },
} as Meta<DesktopWizardProps>;

const Template: Story<DesktopWizardProps> = (args) => {
    const [is_wizard_open, setIsWizardOpen] = useState(true);
    const [data, setData] = useState('');
    const [button_name, setButtonName] = useState('');

    const onWizardOpening = () => {
        setIsWizardOpen(true);
        setData('');
        setButtonName('');
    };

    const handleComplete = (data: { [key: string]: { [key: string]: unknown } }, button_name: string) => {
        setIsWizardOpen(false);
        setData(JSON.stringify(data));
        setButtonName(button_name);
    };

    return (
        <>
            {is_wizard_open ? (
                <DesktopWizard {...args} onClose={() => setIsWizardOpen(false)} onComplete={handleComplete} />
            ) : (
                <>
                    <Button onClick={onWizardOpening}>Open Desktop Wizard</Button>
                    <p>Collected data are: {data}</p>
                    <p>A clicked button name is: {button_name}</p>
                </>
            )}
        </>
    );
};

export const LightDesktopAppWizard = Template.bind({});
LightDesktopAppWizard.args = {
    dark: false,
    has_dark_background: true,
    steps: test_steps,
    wizard_title: "Let's get you a new app.",
};
export const LightDesktopAppWizardWithoutDarkBackground = Template.bind({});
LightDesktopAppWizardWithoutDarkBackground.args = {
    dark: false,
    has_dark_background: false,
    steps: test_steps,
    wizard_title: "Let's get you a new app.",
};
export const DarkDesktopAppWizard = Template.bind({});
DarkDesktopAppWizard.args = {
    dark: true,
    has_dark_background: true,
    steps: test_steps,
    wizard_title: "Let's get you a new app.",
};
export const DarkDesktopAppWizardWithoutDarkBackground = Template.bind({});
DarkDesktopAppWizardWithoutDarkBackground.args = {
    dark: true,
    has_dark_background: false,
    steps: test_steps,
    wizard_title: "Let's get you a new app.",
};
