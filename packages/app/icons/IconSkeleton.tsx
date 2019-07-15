import React from 'react';
import styled from 'styled-components';

import Icon, { IconType } from '../components/Icon';

const IconResponsive = styled(Icon)<IconType>`
  width: 90%;
  height: auto;
  max-width: ${({ width }) => width}px;
  max-height: ${({ height }) => height}px;
`;

function IconSkeleton(props: IconType) {
  return (
    <IconResponsive viewBox="0 0 650 175" width={650} height={175} {...props}>
      <path d="M285.37 13.67H6.63C3.09 13.67.2 10.77.2 7.24.2 3.7 3.1.8 6.63.8h278.9c3.54 0 6.43 2.9 6.43 6.43-.15 3.54-3.05 6.44-6.59 6.44zM369.97 45.67H22.56c-3.54 0-6.43-2.9-6.43-6.43 0-3.54 2.9-6.43 6.43-6.43h347.42c3.54 0 6.43 2.9 6.43 6.43 0 3.54-2.9 6.43-6.44 6.43zM254.65 77.52H38.8c-3.54 0-6.43-2.9-6.43-6.43 0-3.54 2.9-6.43 6.43-6.43h215.85c3.54 0 6.43 2.9 6.43 6.43.01 3.54-2.89 6.43-6.43 6.43zM643.57 109.37H38.8c-3.54 0-6.43-2.9-6.43-6.43 0-3.54 2.9-6.43 6.43-6.43h604.76c3.54 0 6.43 2.9 6.43 6.43.01 3.53-2.89 6.43-6.42 6.43zM61.48 141.21H22.72c-3.54 0-6.43-2.9-6.43-6.43 0-3.54 2.9-6.43 6.43-6.43h38.92c3.54 0 6.43 2.9 6.43 6.43-.16 3.54-3.05 6.43-6.59 6.43zM12.26 173.06H6.63c-3.54 0-6.43-2.9-6.43-6.43 0-3.54 2.9-6.43 6.43-6.43h5.63c3.54 0 6.43 2.9 6.43 6.43.01 3.54-2.89 6.43-6.43 6.43z" />
    </IconResponsive>
  );
}

export default IconSkeleton;