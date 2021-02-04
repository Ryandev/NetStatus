
import React from 'react';
import { IconName, library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faPlug, faQuestionCircle, faExclamationTriangle, faWifi, faSpinner, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './icon.css';

var _hasInitializedFontAwesome = false;

const _initFontAwesome = () => {
    if ( _hasInitializedFontAwesome ) { return; }
    _hasInitializedFontAwesome = true;

    library.add(faCheckCircle, faPlug, faQuestionCircle, faExclamationTriangle, faWifi, faMapMarkerAlt, faClock);
}

function ComponentForIconName(faIconName: IconName, className="", styling={}): JSX.Element {
    _initFontAwesome();
    return (<FontAwesomeIcon className={className} icon={faIconName} style={styling} />);
}

const TickCircle            = (styling={}) => ComponentForIconName(faCheckCircle.iconName, '', styling);
const QuestionMarkCircle    = (styling={}) => ComponentForIconName(faQuestionCircle.iconName, '', styling);
const ExclamationTriangle   = (styling={}) => ComponentForIconName(faExclamationTriangle.iconName, '', styling);
const Plug                  = (styling={}) => ComponentForIconName(faPlug.iconName, '', styling);
const WiFi                  = (styling={}) => ComponentForIconName(faWifi.iconName, '', styling);
const Spinner               = (styling={}) => ComponentForIconName(faSpinner.iconName, 'animateRotate', styling);
const MapMarker             = (styling={}) => ComponentForIconName(faMapMarkerAlt.iconName, '', styling);
const Clock                 = (styling={}) => ComponentForIconName(faClock.iconName, '', styling);

const exports = {
    TickCircle,
    QuestionMarkCircle,
    ExclamationTriangle,
    Plug,
    WiFi,
    Spinner,
    MapMarker,
    Clock,
};

export default exports;
