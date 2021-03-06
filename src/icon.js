import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { icons } from './icon-set';

const SVG = glamorous('svg', { propsAreCssOverrides: true })(
  {
    fill: 'currentcolor',
    verticalAlign: 'middle',
  },
  ({ width, height }) => ({
    minWidth: width,
    minHeight: height,
  }),
);

function Icon(props) {
  const { name, size, ...other } = props;

  if (icons.indexOf(name) === -1) {
    // eslint-disable-next-line no-console
    console.warn(`${name} not found in iconset; no-op`);
    return null;
  }

  let width = size;
  let height = size;
  if (typeof size === 'string' && size.indexOf('x') > -1) {
    [width, height] = size.split('x');
  }

  return (
    <SVG {...other} width={width} height={height}>
      <use xlinkHref={`#icon:${name}`} />
    </SVG>
  );
}

const stringOrNumber = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

SVG.propTypes = {
  color: PropTypes.string.isRequired,
  width: stringOrNumber.isRequired,
  height: stringOrNumber.isRequired,
};

SVG.defaultProps = {
  color: 'inherit',
  width: 24,
  height: 24,
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: stringOrNumber,
};

Icon.defaultProps = {
  color: 'inherit',
  size: 24,
};

export default Icon;
