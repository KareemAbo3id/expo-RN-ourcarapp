export default function getLinkFromGithub(
  profile = '',
  repo = '',
  dir = '',
  file = ''
) {
  return `https://raw.githubusercontent.com/
  ${profile}
  ${profile[-1] === '/' ? '' : '/'}
  ${repo}
  ${repo[-1] === '/' ? '' : '/'}
  ${dir}
  ${dir[-1] === '/' ? '' : '/'}
  ${file}`.replace(/\n/g, '');
}
