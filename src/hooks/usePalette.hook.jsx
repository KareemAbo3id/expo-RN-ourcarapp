// react function /////////////////////////
export default function usePalette() {
  // Primary colors:
  const Primary = '#526ff1';
  const SecPrimary = '#BAD7E9';

  // bg
  const darkBg = '#263578';

  // dark:
  const PrimDark = '#1a1c1f';
  const SecDark = '#455560';

  // Laigt
  const PrimLight = '#f2f3f5';
  const SecLight = '#D2DAFF';

  // helper colors:
  const Black = '#000000';
  const White = '#ffffff';
  const Red = '#EB455F';
  const Warning = '#ffd451';
  const Success = '#28a745';
  const Info = '#2ebdd3';

  // the hook
  return {
    Primary,
    SecPrimary,
    darkBg,
    PrimDark,
    SecDark,
    PrimLight,
    SecLight,
    Black,
    White,
    Red,
    Warning,
    Success,
    Info,
  };
}
