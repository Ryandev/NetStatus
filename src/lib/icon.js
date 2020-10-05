
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faPlug, faQuestionCircle, faExclamationTriangle, faWifi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { name as iconNames } from '../constants/icon';
import log from '../lib/log';

var _hasInitializedFontAwesome = false;
var _mappings = {};

const _initFontAwesome = () => {
    if ( _hasInitializedFontAwesome ) { return; }
    _hasInitializedFontAwesome = true;

    _mappings[iconNames.tickCircle] = faCheckCircle.iconName;
    _mappings[iconNames.questionMarkCircle] = faQuestionCircle.iconName;
    _mappings[iconNames.exclamationTriangle] = faExclamationTriangle.iconName;
    _mappings[iconNames.plug] = faPlug.iconName;
    _mappings[iconNames.wifi] = faWifi.iconName;

    library.add(faCheckCircle, faPlug, faQuestionCircle, faExclamationTriangle, faWifi);
}

const drawableComponentForIcon = (iconName) => {
    _initFontAwesome();
    var faIconName = _mappings[iconName];

    if ( faIconName === undefined ) {
        log.error('Unrecognised icon name: ' + iconName);
        return '';
    }

    return (<FontAwesomeIcon icon={faIconName} />);
}

export default {
    drawableComponentForIcon,
}