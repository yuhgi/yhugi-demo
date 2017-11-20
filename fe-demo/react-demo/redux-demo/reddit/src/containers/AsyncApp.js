import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {
    selectSubreddit,
    fetchPosts
} from '../actions';