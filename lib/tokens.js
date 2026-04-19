// Design tokens — single source of truth for all pages.
// CSS variables in globals.css mirror these values.

export const color = {
  // Brand
  brand:        '#FFD600',
  brandHover:   '#FFE040',
  brandShadow:  'rgba(255,214,0,0.35)',
  brandFaint:   'rgba(255,214,0,0.1)',

  // Backgrounds
  bg:           '#0A0A0A',
  surface:      '#141414',
  surfaceAlt:   '#1C1C1C',

  // Borders
  border:       '#2A2A2A',
  borderSubtle: '#1E1E1E',

  // Text
  textPrimary:  '#FFFFFF',
  textSecondary:'#AAAAAA',
  textMuted:    '#666666',
  textLabel:    '#888888',
  placeholder:  '#444444',

  // Feedback
  red:          '#E8140A',
  errorBg:      '#1A0F0F',
  errorBorder:  '#6B2020',
  errorText:    '#FC8181',
  errorField:   '#E53E3E',
  warnOrange:   '#DD6B20',
  warnYellow:   '#D69E2E',
  successGreen: '#38A169',
}

export const font = {
  display: "'Bebas Neue', sans-serif",
  ui:      "'Montserrat', sans-serif",
  body:    "'Inter', sans-serif",
}

export const size = {
  // Font sizes
  xs:      '11px',
  sm:      '13px',
  base:    '14px',
  md:      '16px',
  lg:      '19px',
  xl:      '24px',
  '2xl':   '32px',
  '3xl':   '48px',
  '4xl':   '64px',

  // Border radius
  tag:     '2px',
  input:   '8px',
  card:    '12px',
  cardLg:  '16px',

  // Borders
  border:  '1.5px',
  borderMd:'2px',
}

export const space = {
  xs:  '4px',
  sm:  '8px',
  md:  '16px',
  lg:  '24px',
  xl:  '32px',
  '2xl':'48px',
}

// Reusable style fragments
export const input = (hasError = false) => ({
  width: '100%',
  minHeight: '52px',
  padding: '12px 14px',
  background: '#0F0F0F',
  border: `${size.border} solid ${hasError ? color.errorField : color.border}`,
  borderRadius: size.input,
  color: color.textPrimary,
  fontSize: size.base,
  fontFamily: font.body,
  boxSizing: 'border-box',
})

export const tag = {
  display: 'inline-block',
  background: color.brand,
  color: '#000',
  fontSize: size.xs,
  fontWeight: '800',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  padding: '4px 10px',
  borderRadius: size.tag,
  marginBottom: '10px',
}

export const submitButton = {
  width: '100%',
  minHeight: '52px',
  padding: '0 16px',
  background: color.brand,
  color: '#000',
  fontWeight: '800',
  fontSize: size.sm,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  border: 'none',
  borderRadius: size.input,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: font.ui,
  marginTop: space.xs,
  transition: 'background 0.2s',
}
