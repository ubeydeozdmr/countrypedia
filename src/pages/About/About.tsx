import React from 'react';

export default function About(): React.ReactElement {
  return (
    <div>
      <h1>About</h1>
      <p>
        The v3 version of this site is still under development. The site is
        sorely lacking in its current form. You can see what is planned to be
        done by{' '}
        <a
          style={{ color: 'red' }}
          href="https://github.com/ubeydeozdmr/countrypedia/blob/dev/README.md"
        >
          clicking here.
        </a>{' '}
        For now, we recommend that you use the completed v2 version instead of
        using this version. Here is the link to the v2 version:{' '}
        <a style={{ color: 'red' }} href="https://countrypedia.app/">
          https://countrypedia.app/
        </a>
      </p>
    </div>
  );
}
