
import React from 'react';
import { IconName, library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faPlug, faQuestionCircle, faExclamationTriangle, faWifi, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './icon.css';

var _hasInitializedFontAwesome = false;

const _initFontAwesome = () => {
    if ( _hasInitializedFontAwesome ) { return; }
    _hasInitializedFontAwesome = true;

    library.add(faCheckCircle, faPlug, faQuestionCircle, faExclamationTriangle, faWifi);
}

function ComponentForIconName(faIconName: IconName, className=""): JSX.Element {
    _initFontAwesome();
    return (<FontAwesomeIcon className={className} icon={faIconName} />);
}

const TickCircle            = () => ComponentForIconName(faCheckCircle.iconName);
const QuestionMarkCircle    = () => ComponentForIconName(faQuestionCircle.iconName);
const ExclamationTriangle   = () => ComponentForIconName(faExclamationTriangle.iconName);
const Plug                  = () => ComponentForIconName(faPlug.iconName);
const WiFi                  = () => ComponentForIconName(faWifi.iconName);
const Spinner               = () => ComponentForIconName(faSpinner.iconName, 'animateRotate');

const exports = {
    TickCircle,
    QuestionMarkCircle,
    ExclamationTriangle,
    Plug,
    WiFi,
    Spinner,
};

export default exports;
