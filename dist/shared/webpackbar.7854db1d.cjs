'use strict';

const stdEnv = require('std-env');
const prettyTime = require('pretty-time');
const path = require('node:path');
const c = require('ansis');
const consola$1 = require('consola');
const process$1 = require('node:process');
const stringWidth = require('string-width');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const prettyTime__default = /*#__PURE__*/_interopDefaultCompat(prettyTime);
const path__default = /*#__PURE__*/_interopDefaultCompat(path);
const c__default = /*#__PURE__*/_interopDefaultCompat(c);
const process__default = /*#__PURE__*/_interopDefaultCompat(process$1);
const stringWidth__default = /*#__PURE__*/_interopDefaultCompat(stringWidth);

function first(arr) {
  return arr[0];
}
function last(arr) {
  return arr.length > 0 ? arr[arr.length - 1] : null;
}
function startCase(str) {
  return str[0].toUpperCase() + str.slice(1);
}
function firstMatch(regex, str) {
  const m = regex.exec(str);
  return m ? m[0] : null;
}
function hasValue(s) {
  return s && s.length > 0;
}
function removeAfter(delimiter, str) {
  return first(str.split(delimiter)) || "";
}
function removeBefore(delimiter, str) {
  return last(str.split(delimiter)) || "";
}
function range(len) {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
}
function shortenPath(path$1 = "") {
  const cwd = process.cwd() + path.sep;
  return String(path$1).replace(cwd, "");
}
function objectValues(obj) {
  return Object.keys(obj).map((key) => obj[key]);
}

// To do: next major: remove.
/**
 * @typedef {Options} MarkdownTableOptions
 *   Configuration.
 */

/**
 * @typedef Options
 *   Configuration.
 * @property {boolean | null | undefined} [alignDelimiters=true]
 *   Whether to align the delimiters (default: `true`);
 *   they are aligned by default:
 *
 *   ```markdown
 *   | Alpha | B     |
 *   | ----- | ----- |
 *   | C     | Delta |
 *   ```
 *
 *   Pass `false` to make them staggered:
 *
 *   ```markdown
 *   | Alpha | B |
 *   | - | - |
 *   | C | Delta |
 *   ```
 * @property {ReadonlyArray<string | null | undefined> | string | null | undefined} [align]
 *   How to align columns (default: `''`);
 *   one style for all columns or styles for their respective columns;
 *   each style is either `'l'` (left), `'r'` (right), or `'c'` (center);
 *   other values are treated as `''`, which doesn’t place the colon in the
 *   alignment row but does align left;
 *   *only the lowercased first character is used, so `Right` is fine.*
 * @property {boolean | null | undefined} [delimiterEnd=true]
 *   Whether to end each row with the delimiter (default: `true`).
 *
 *   > 👉 **Note**: please don’t use this: it could create fragile structures
 *   > that aren’t understandable to some markdown parsers.
 *
 *   When `true`, there are ending delimiters:
 *
 *   ```markdown
 *   | Alpha | B     |
 *   | ----- | ----- |
 *   | C     | Delta |
 *   ```
 *
 *   When `false`, there are no ending delimiters:
 *
 *   ```markdown
 *   | Alpha | B
 *   | ----- | -----
 *   | C     | Delta
 *   ```
 * @property {boolean | null | undefined} [delimiterStart=true]
 *   Whether to begin each row with the delimiter (default: `true`).
 *
 *   > 👉 **Note**: please don’t use this: it could create fragile structures
 *   > that aren’t understandable to some markdown parsers.
 *
 *   When `true`, there are starting delimiters:
 *
 *   ```markdown
 *   | Alpha | B     |
 *   | ----- | ----- |
 *   | C     | Delta |
 *   ```
 *
 *   When `false`, there are no starting delimiters:
 *
 *   ```markdown
 *   Alpha | B     |
 *   ----- | ----- |
 *   C     | Delta |
 *   ```
 * @property {boolean | null | undefined} [padding=true]
 *   Whether to add a space of padding between delimiters and cells
 *   (default: `true`).
 *
 *   When `true`, there is padding:
 *
 *   ```markdown
 *   | Alpha | B     |
 *   | ----- | ----- |
 *   | C     | Delta |
 *   ```
 *
 *   When `false`, there is no padding:
 *
 *   ```markdown
 *   |Alpha|B    |
 *   |-----|-----|
 *   |C    |Delta|
 *   ```
 * @property {((value: string) => number) | null | undefined} [stringLength]
 *   Function to detect the length of table cell content (optional);
 *   this is used when aligning the delimiters (`|`) between table cells;
 *   full-width characters and emoji mess up delimiter alignment when viewing
 *   the markdown source;
 *   to fix this, you can pass this function,
 *   which receives the cell content and returns its “visible” size;
 *   note that what is and isn’t visible depends on where the text is displayed.
 *
 *   Without such a function, the following:
 *
 *   ```js
 *   markdownTable([
 *     ['Alpha', 'Bravo'],
 *     ['中文', 'Charlie'],
 *     ['👩‍❤️‍👩', 'Delta']
 *   ])
 *   ```
 *
 *   Yields:
 *
 *   ```markdown
 *   | Alpha | Bravo |
 *   | - | - |
 *   | 中文 | Charlie |
 *   | 👩‍❤️‍👩 | Delta |
 *   ```
 *
 *   With [`string-width`](https://github.com/sindresorhus/string-width):
 *
 *   ```js
 *   import stringWidth from 'string-width'
 *
 *   markdownTable(
 *     [
 *       ['Alpha', 'Bravo'],
 *       ['中文', 'Charlie'],
 *       ['👩‍❤️‍👩', 'Delta']
 *     ],
 *     {stringLength: stringWidth}
 *   )
 *   ```
 *
 *   Yields:
 *
 *   ```markdown
 *   | Alpha | Bravo   |
 *   | ----- | ------- |
 *   | 中文  | Charlie |
 *   | 👩‍❤️‍👩    | Delta   |
 *   ```
 */

/**
 * @param {string} value
 *   Cell value.
 * @returns {number}
 *   Cell size.
 */
function defaultStringLength(value) {
  return value.length
}

/**
 * Generate a markdown
 * ([GFM](https://docs.github.com/en/github/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables))
 * table.
 *
 * @param {ReadonlyArray<ReadonlyArray<string | null | undefined>>} table
 *   Table data (matrix of strings).
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns {string}
 *   Result.
 */
function markdownTable(table, options) {
  const settings = options || {};
  // To do: next major: change to spread.
  const align = (settings.align || []).concat();
  const stringLength = settings.stringLength || defaultStringLength;
  /** @type {Array<number>} Character codes as symbols for alignment per column. */
  const alignments = [];
  /** @type {Array<Array<string>>} Cells per row. */
  const cellMatrix = [];
  /** @type {Array<Array<number>>} Sizes of each cell per row. */
  const sizeMatrix = [];
  /** @type {Array<number>} */
  const longestCellByColumn = [];
  let mostCellsPerRow = 0;
  let rowIndex = -1;

  // This is a superfluous loop if we don’t align delimiters, but otherwise we’d
  // do superfluous work when aligning, so optimize for aligning.
  while (++rowIndex < table.length) {
    /** @type {Array<string>} */
    const row = [];
    /** @type {Array<number>} */
    const sizes = [];
    let columnIndex = -1;

    if (table[rowIndex].length > mostCellsPerRow) {
      mostCellsPerRow = table[rowIndex].length;
    }

    while (++columnIndex < table[rowIndex].length) {
      const cell = serialize(table[rowIndex][columnIndex]);

      if (settings.alignDelimiters !== false) {
        const size = stringLength(cell);
        sizes[columnIndex] = size;

        if (
          longestCellByColumn[columnIndex] === undefined ||
          size > longestCellByColumn[columnIndex]
        ) {
          longestCellByColumn[columnIndex] = size;
        }
      }

      row.push(cell);
    }

    cellMatrix[rowIndex] = row;
    sizeMatrix[rowIndex] = sizes;
  }

  // Figure out which alignments to use.
  let columnIndex = -1;

  if (typeof align === 'object' && 'length' in align) {
    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = toAlignment(align[columnIndex]);
    }
  } else {
    const code = toAlignment(align);

    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = code;
    }
  }

  // Inject the alignment row.
  columnIndex = -1;
  /** @type {Array<string>} */
  const row = [];
  /** @type {Array<number>} */
  const sizes = [];

  while (++columnIndex < mostCellsPerRow) {
    const code = alignments[columnIndex];
    let before = '';
    let after = '';

    if (code === 99 /* `c` */) {
      before = ':';
      after = ':';
    } else if (code === 108 /* `l` */) {
      before = ':';
    } else if (code === 114 /* `r` */) {
      after = ':';
    }

    // There *must* be at least one hyphen-minus in each alignment cell.
    let size =
      settings.alignDelimiters === false
        ? 1
        : Math.max(
            1,
            longestCellByColumn[columnIndex] - before.length - after.length
          );

    const cell = before + '-'.repeat(size) + after;

    if (settings.alignDelimiters !== false) {
      size = before.length + size + after.length;

      if (size > longestCellByColumn[columnIndex]) {
        longestCellByColumn[columnIndex] = size;
      }

      sizes[columnIndex] = size;
    }

    row[columnIndex] = cell;
  }

  // Inject the alignment row.
  cellMatrix.splice(1, 0, row);
  sizeMatrix.splice(1, 0, sizes);

  rowIndex = -1;
  /** @type {Array<string>} */
  const lines = [];

  while (++rowIndex < cellMatrix.length) {
    const row = cellMatrix[rowIndex];
    const sizes = sizeMatrix[rowIndex];
    columnIndex = -1;
    /** @type {Array<string>} */
    const line = [];

    while (++columnIndex < mostCellsPerRow) {
      const cell = row[columnIndex] || '';
      let before = '';
      let after = '';

      if (settings.alignDelimiters !== false) {
        const size =
          longestCellByColumn[columnIndex] - (sizes[columnIndex] || 0);
        const code = alignments[columnIndex];

        if (code === 114 /* `r` */) {
          before = ' '.repeat(size);
        } else if (code === 99 /* `c` */) {
          if (size % 2) {
            before = ' '.repeat(size / 2 + 0.5);
            after = ' '.repeat(size / 2 - 0.5);
          } else {
            before = ' '.repeat(size / 2);
            after = before;
          }
        } else {
          after = ' '.repeat(size);
        }
      }

      if (settings.delimiterStart !== false && !columnIndex) {
        line.push('|');
      }

      if (
        settings.padding !== false &&
        // Don’t add the opening space if we’re not aligning and the cell is
        // empty: there will be a closing space.
        !(settings.alignDelimiters === false && cell === '') &&
        (settings.delimiterStart !== false || columnIndex)
      ) {
        line.push(' ');
      }

      if (settings.alignDelimiters !== false) {
        line.push(before);
      }

      line.push(cell);

      if (settings.alignDelimiters !== false) {
        line.push(after);
      }

      if (settings.padding !== false) {
        line.push(' ');
      }

      if (
        settings.delimiterEnd !== false ||
        columnIndex !== mostCellsPerRow - 1
      ) {
        line.push('|');
      }
    }

    lines.push(
      settings.delimiterEnd === false
        ? line.join('').replace(/ +$/, '')
        : line.join('')
    );
  }

  return lines.join('\n')
}

/**
 * @param {string | null | undefined} [value]
 *   Value to serialize.
 * @returns {string}
 *   Result.
 */
function serialize(value) {
  return value === null || value === undefined ? '' : String(value)
}

/**
 * @param {string | null | undefined} value
 *   Value.
 * @returns {number}
 *   Alignment.
 */
function toAlignment(value) {
  const code = typeof value === 'string' ? value.codePointAt(0) : 0;

  return code === 67 /* `C` */ || code === 99 /* `c` */
    ? 99 /* `c` */
    : code === 76 /* `L` */ || code === 108 /* `l` */
      ? 108 /* `l` */
      : code === 82 /* `R` */ || code === 114 /* `r` */
        ? 114 /* `r` */
        : 0
}

function isUnicodeSupported() {
	const {env} = process__default;
	const {TERM, TERM_PROGRAM} = env;

	if (process__default.platform !== 'win32') {
		return TERM !== 'linux'; // Linux console (kernel)
	}

	return Boolean(env.WT_SESSION) // Windows Terminal
		|| Boolean(env.TERMINUS_SUBLIME) // Terminus (<0.2.27)
		|| env.ConEmuTask === '{cmd::Cmder}' // ConEmu and cmder
		|| TERM_PROGRAM === 'Terminus-Sublime'
		|| TERM_PROGRAM === 'vscode'
		|| TERM === 'xterm-256color'
		|| TERM === 'alacritty'
		|| TERM === 'rxvt-unicode'
		|| TERM === 'rxvt-unicode-256color'
		|| env.TERMINAL_EMULATOR === 'JetBrains-JediTerm';
}

const common = {
	circleQuestionMark: '(?)',
	questionMarkPrefix: '(?)',
	square: '█',
	squareDarkShade: '▓',
	squareMediumShade: '▒',
	squareLightShade: '░',
	squareTop: '▀',
	squareBottom: '▄',
	squareLeft: '▌',
	squareRight: '▐',
	squareCenter: '■',
	bullet: '●',
	dot: '․',
	ellipsis: '…',
	pointerSmall: '›',
	triangleUp: '▲',
	triangleUpSmall: '▴',
	triangleDown: '▼',
	triangleDownSmall: '▾',
	triangleLeftSmall: '◂',
	triangleRightSmall: '▸',
	home: '⌂',
	heart: '♥',
	musicNote: '♪',
	musicNoteBeamed: '♫',
	arrowUp: '↑',
	arrowDown: '↓',
	arrowLeft: '←',
	arrowRight: '→',
	arrowLeftRight: '↔',
	arrowUpDown: '↕',
	almostEqual: '≈',
	notEqual: '≠',
	lessOrEqual: '≤',
	greaterOrEqual: '≥',
	identical: '≡',
	infinity: '∞',
	subscriptZero: '₀',
	subscriptOne: '₁',
	subscriptTwo: '₂',
	subscriptThree: '₃',
	subscriptFour: '₄',
	subscriptFive: '₅',
	subscriptSix: '₆',
	subscriptSeven: '₇',
	subscriptEight: '₈',
	subscriptNine: '₉',
	oneHalf: '½',
	oneThird: '⅓',
	oneQuarter: '¼',
	oneFifth: '⅕',
	oneSixth: '⅙',
	oneEighth: '⅛',
	twoThirds: '⅔',
	twoFifths: '⅖',
	threeQuarters: '¾',
	threeFifths: '⅗',
	threeEighths: '⅜',
	fourFifths: '⅘',
	fiveSixths: '⅚',
	fiveEighths: '⅝',
	sevenEighths: '⅞',
	line: '─',
	lineBold: '━',
	lineDouble: '═',
	lineDashed0: '┄',
	lineDashed1: '┅',
	lineDashed2: '┈',
	lineDashed3: '┉',
	lineDashed4: '╌',
	lineDashed5: '╍',
	lineDashed6: '╴',
	lineDashed7: '╶',
	lineDashed8: '╸',
	lineDashed9: '╺',
	lineDashed10: '╼',
	lineDashed11: '╾',
	lineDashed12: '−',
	lineDashed13: '–',
	lineDashed14: '‐',
	lineDashed15: '⁃',
	lineVertical: '│',
	lineVerticalBold: '┃',
	lineVerticalDouble: '║',
	lineVerticalDashed0: '┆',
	lineVerticalDashed1: '┇',
	lineVerticalDashed2: '┊',
	lineVerticalDashed3: '┋',
	lineVerticalDashed4: '╎',
	lineVerticalDashed5: '╏',
	lineVerticalDashed6: '╵',
	lineVerticalDashed7: '╷',
	lineVerticalDashed8: '╹',
	lineVerticalDashed9: '╻',
	lineVerticalDashed10: '╽',
	lineVerticalDashed11: '╿',
	lineDownLeft: '┐',
	lineDownLeftArc: '╮',
	lineDownBoldLeftBold: '┓',
	lineDownBoldLeft: '┒',
	lineDownLeftBold: '┑',
	lineDownDoubleLeftDouble: '╗',
	lineDownDoubleLeft: '╖',
	lineDownLeftDouble: '╕',
	lineDownRight: '┌',
	lineDownRightArc: '╭',
	lineDownBoldRightBold: '┏',
	lineDownBoldRight: '┎',
	lineDownRightBold: '┍',
	lineDownDoubleRightDouble: '╔',
	lineDownDoubleRight: '╓',
	lineDownRightDouble: '╒',
	lineUpLeft: '┘',
	lineUpLeftArc: '╯',
	lineUpBoldLeftBold: '┛',
	lineUpBoldLeft: '┚',
	lineUpLeftBold: '┙',
	lineUpDoubleLeftDouble: '╝',
	lineUpDoubleLeft: '╜',
	lineUpLeftDouble: '╛',
	lineUpRight: '└',
	lineUpRightArc: '╰',
	lineUpBoldRightBold: '┗',
	lineUpBoldRight: '┖',
	lineUpRightBold: '┕',
	lineUpDoubleRightDouble: '╚',
	lineUpDoubleRight: '╙',
	lineUpRightDouble: '╘',
	lineUpDownLeft: '┤',
	lineUpBoldDownBoldLeftBold: '┫',
	lineUpBoldDownBoldLeft: '┨',
	lineUpDownLeftBold: '┥',
	lineUpBoldDownLeftBold: '┩',
	lineUpDownBoldLeftBold: '┪',
	lineUpDownBoldLeft: '┧',
	lineUpBoldDownLeft: '┦',
	lineUpDoubleDownDoubleLeftDouble: '╣',
	lineUpDoubleDownDoubleLeft: '╢',
	lineUpDownLeftDouble: '╡',
	lineUpDownRight: '├',
	lineUpBoldDownBoldRightBold: '┣',
	lineUpBoldDownBoldRight: '┠',
	lineUpDownRightBold: '┝',
	lineUpBoldDownRightBold: '┡',
	lineUpDownBoldRightBold: '┢',
	lineUpDownBoldRight: '┟',
	lineUpBoldDownRight: '┞',
	lineUpDoubleDownDoubleRightDouble: '╠',
	lineUpDoubleDownDoubleRight: '╟',
	lineUpDownRightDouble: '╞',
	lineDownLeftRight: '┬',
	lineDownBoldLeftBoldRightBold: '┳',
	lineDownLeftBoldRightBold: '┯',
	lineDownBoldLeftRight: '┰',
	lineDownBoldLeftBoldRight: '┱',
	lineDownBoldLeftRightBold: '┲',
	lineDownLeftRightBold: '┮',
	lineDownLeftBoldRight: '┭',
	lineDownDoubleLeftDoubleRightDouble: '╦',
	lineDownDoubleLeftRight: '╥',
	lineDownLeftDoubleRightDouble: '╤',
	lineUpLeftRight: '┴',
	lineUpBoldLeftBoldRightBold: '┻',
	lineUpLeftBoldRightBold: '┷',
	lineUpBoldLeftRight: '┸',
	lineUpBoldLeftBoldRight: '┹',
	lineUpBoldLeftRightBold: '┺',
	lineUpLeftRightBold: '┶',
	lineUpLeftBoldRight: '┵',
	lineUpDoubleLeftDoubleRightDouble: '╩',
	lineUpDoubleLeftRight: '╨',
	lineUpLeftDoubleRightDouble: '╧',
	lineUpDownLeftRight: '┼',
	lineUpBoldDownBoldLeftBoldRightBold: '╋',
	lineUpDownBoldLeftBoldRightBold: '╈',
	lineUpBoldDownLeftBoldRightBold: '╇',
	lineUpBoldDownBoldLeftRightBold: '╊',
	lineUpBoldDownBoldLeftBoldRight: '╉',
	lineUpBoldDownLeftRight: '╀',
	lineUpDownBoldLeftRight: '╁',
	lineUpDownLeftBoldRight: '┽',
	lineUpDownLeftRightBold: '┾',
	lineUpBoldDownBoldLeftRight: '╂',
	lineUpDownLeftBoldRightBold: '┿',
	lineUpBoldDownLeftBoldRight: '╃',
	lineUpBoldDownLeftRightBold: '╄',
	lineUpDownBoldLeftBoldRight: '╅',
	lineUpDownBoldLeftRightBold: '╆',
	lineUpDoubleDownDoubleLeftDoubleRightDouble: '╬',
	lineUpDoubleDownDoubleLeftRight: '╫',
	lineUpDownLeftDoubleRightDouble: '╪',
	lineCross: '╳',
	lineBackslash: '╲',
	lineSlash: '╱',
};

const specialMainSymbols = {
	tick: '✔',
	info: 'ℹ',
	warning: '⚠',
	cross: '✘',
	squareSmall: '◻',
	squareSmallFilled: '◼',
	circle: '◯',
	circleFilled: '◉',
	circleDotted: '◌',
	circleDouble: '◎',
	circleCircle: 'ⓞ',
	circleCross: 'ⓧ',
	circlePipe: 'Ⓘ',
	radioOn: '◉',
	radioOff: '◯',
	checkboxOn: '☒',
	checkboxOff: '☐',
	checkboxCircleOn: 'ⓧ',
	checkboxCircleOff: 'Ⓘ',
	pointer: '❯',
	triangleUpOutline: '△',
	triangleLeft: '◀',
	triangleRight: '▶',
	lozenge: '◆',
	lozengeOutline: '◇',
	hamburger: '☰',
	smiley: '㋡',
	mustache: '෴',
	star: '★',
	play: '▶',
	nodejs: '⬢',
	oneSeventh: '⅐',
	oneNinth: '⅑',
	oneTenth: '⅒',
};

const specialFallbackSymbols = {
	tick: '√',
	info: 'i',
	warning: '‼',
	cross: '×',
	squareSmall: '□',
	squareSmallFilled: '■',
	circle: '( )',
	circleFilled: '(*)',
	circleDotted: '( )',
	circleDouble: '( )',
	circleCircle: '(○)',
	circleCross: '(×)',
	circlePipe: '(│)',
	radioOn: '(*)',
	radioOff: '( )',
	checkboxOn: '[×]',
	checkboxOff: '[ ]',
	checkboxCircleOn: '(×)',
	checkboxCircleOff: '( )',
	pointer: '>',
	triangleUpOutline: '∆',
	triangleLeft: '◄',
	triangleRight: '►',
	lozenge: '♦',
	lozengeOutline: '◊',
	hamburger: '≡',
	smiley: '☺',
	mustache: '┌─┐',
	star: '✶',
	play: '►',
	nodejs: '♦',
	oneSeventh: '1/7',
	oneNinth: '1/9',
	oneTenth: '1/10',
};

const mainSymbols = {...common, ...specialMainSymbols};
const fallbackSymbols = {...common, ...specialFallbackSymbols};

const shouldUseMain = isUnicodeSupported();
const figures = shouldUseMain ? mainSymbols : fallbackSymbols;
const figures$1 = figures;

const { bullet, tick, cross, pointerSmall, radioOff } = figures$1;
const nodeModules = `${path.delimiter}node_modules${path.delimiter}`;
const BAR_LENGTH = 25;
const BLOCK_CHAR = "\u2588";
const BLOCK_CHAR2 = "\u2588";
const NEXT = " " + c.blue(pointerSmall) + " ";
const BULLET = bullet;
const TICK = tick;
const CROSS = cross;
const CIRCLE_OPEN = radioOff;

const consola = consola$1.consola.withTag("webpackbar");
const colorize = (color) => {
  return color[0] === "#" ? c__default.hex(color) : c__default[color] || c__default.reset;
};
const renderBar = (progress, color) => {
  const w = progress * (BAR_LENGTH / 100);
  const bg = c__default.white(BLOCK_CHAR);
  const fg = colorize(color)(BLOCK_CHAR2);
  return range(BAR_LENGTH).map((i) => i < w ? fg : bg).join("");
};
function createTable(data) {
  return markdownTable(data);
}
function ellipsisLeft(str, n) {
  if (str.length <= n - 3) {
    return str;
  }
  return `...${str.slice(str.length - n - 1)}`;
}
function eraseLines(count) {
  let clear = "";
  for (let i = 0; i < count; i++) {
    clear += `\x1B[2K` + (i < count - 1 ? `\x1B[1A` : "");
  }
  if (count)
    clear += `\x1B[G`;
  return clear;
}

const parseRequest = (requestStr) => {
  const parts = (requestStr || "").split("!");
  const file = path__default.relative(
    process.cwd(),
    removeAfter("?", removeBefore(nodeModules, parts.pop()))
  );
  const loaders = parts.map((part) => firstMatch(/[\d@a-z-]+-loader/, part)).filter((v) => hasValue(v));
  return {
    file: hasValue(file) ? file : null,
    loaders
  };
};
const formatRequest = (request) => {
  const loaders = request.loaders.join(NEXT);
  if (loaders.length === 0) {
    return request.file || "";
  }
  return `${loaders}${NEXT}${request.file}`;
};
function hook(compiler, hookName, fn) {
  if (compiler.hooks) {
    compiler.hooks[hookName].tap("WebpackBar:" + hookName, fn);
  } else {
    compiler.plugin(hookName, fn);
  }
}

function ansiRegex({onlyFirst = false} = {}) {
	// Valid string terminator sequences are BEL, ESC\, and 0x9c
	const ST = '(?:\\u0007|\\u001B\\u005C|\\u009C)';
	const pattern = [
		`[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?${ST})`,
		'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
	].join('|');

	return new RegExp(pattern, onlyFirst ? undefined : 'g');
}

const regex = ansiRegex();

function stripAnsi(string) {
	if (typeof string !== 'string') {
		throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
	}

	// Even though the regex is global, we don't need to reset the `.lastIndex`
	// because unlike `.exec()` and `.test()`, `.replace()` does it automatically
	// and doing it manually has a performance penalty.
	return string.replace(regex, '');
}

const ANSI_BACKGROUND_OFFSET = 10;

const wrapAnsi16 = (offset = 0) => code => `\u001B[${code + offset}m`;

const wrapAnsi256 = (offset = 0) => code => `\u001B[${38 + offset};5;${code}m`;

const wrapAnsi16m = (offset = 0) => (red, green, blue) => `\u001B[${38 + offset};2;${red};${green};${blue}m`;

const styles = {
	modifier: {
		reset: [0, 0],
		// 21 isn't widely supported and 22 does the same thing
		bold: [1, 22],
		dim: [2, 22],
		italic: [3, 23],
		underline: [4, 24],
		overline: [53, 55],
		inverse: [7, 27],
		hidden: [8, 28],
		strikethrough: [9, 29],
	},
	color: {
		black: [30, 39],
		red: [31, 39],
		green: [32, 39],
		yellow: [33, 39],
		blue: [34, 39],
		magenta: [35, 39],
		cyan: [36, 39],
		white: [37, 39],

		// Bright color
		blackBright: [90, 39],
		gray: [90, 39], // Alias of `blackBright`
		grey: [90, 39], // Alias of `blackBright`
		redBright: [91, 39],
		greenBright: [92, 39],
		yellowBright: [93, 39],
		blueBright: [94, 39],
		magentaBright: [95, 39],
		cyanBright: [96, 39],
		whiteBright: [97, 39],
	},
	bgColor: {
		bgBlack: [40, 49],
		bgRed: [41, 49],
		bgGreen: [42, 49],
		bgYellow: [43, 49],
		bgBlue: [44, 49],
		bgMagenta: [45, 49],
		bgCyan: [46, 49],
		bgWhite: [47, 49],

		// Bright color
		bgBlackBright: [100, 49],
		bgGray: [100, 49], // Alias of `bgBlackBright`
		bgGrey: [100, 49], // Alias of `bgBlackBright`
		bgRedBright: [101, 49],
		bgGreenBright: [102, 49],
		bgYellowBright: [103, 49],
		bgBlueBright: [104, 49],
		bgMagentaBright: [105, 49],
		bgCyanBright: [106, 49],
		bgWhiteBright: [107, 49],
	},
};

Object.keys(styles.modifier);
const foregroundColorNames = Object.keys(styles.color);
const backgroundColorNames = Object.keys(styles.bgColor);
[...foregroundColorNames, ...backgroundColorNames];

function assembleStyles() {
	const codes = new Map();

	for (const [groupName, group] of Object.entries(styles)) {
		for (const [styleName, style] of Object.entries(group)) {
			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`,
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false,
		});
	}

	Object.defineProperty(styles, 'codes', {
		value: codes,
		enumerable: false,
	});

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	styles.color.ansi = wrapAnsi16();
	styles.color.ansi256 = wrapAnsi256();
	styles.color.ansi16m = wrapAnsi16m();
	styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
	styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
	styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);

	// From https://github.com/Qix-/color-convert/blob/3f0e0d4e92e235796ccb17f6e85c72094a651f49/conversions.js
	Object.defineProperties(styles, {
		rgbToAnsi256: {
			value: (red, green, blue) => {
				// We use the extended greyscale palette here, with the exception of
				// black and white. normal palette only has 4 greyscale shades.
				if (red === green && green === blue) {
					if (red < 8) {
						return 16;
					}

					if (red > 248) {
						return 231;
					}

					return Math.round(((red - 8) / 247) * 24) + 232;
				}

				return 16
					+ (36 * Math.round(red / 255 * 5))
					+ (6 * Math.round(green / 255 * 5))
					+ Math.round(blue / 255 * 5);
			},
			enumerable: false,
		},
		hexToRgb: {
			value: hex => {
				const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
				if (!matches) {
					return [0, 0, 0];
				}

				let [colorString] = matches;

				if (colorString.length === 3) {
					colorString = [...colorString].map(character => character + character).join('');
				}

				const integer = Number.parseInt(colorString, 16);

				return [
					/* eslint-disable no-bitwise */
					(integer >> 16) & 0xFF,
					(integer >> 8) & 0xFF,
					integer & 0xFF,
					/* eslint-enable no-bitwise */
				];
			},
			enumerable: false,
		},
		hexToAnsi256: {
			value: hex => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
			enumerable: false,
		},
		ansi256ToAnsi: {
			value: code => {
				if (code < 8) {
					return 30 + code;
				}

				if (code < 16) {
					return 90 + (code - 8);
				}

				let red;
				let green;
				let blue;

				if (code >= 232) {
					red = (((code - 232) * 10) + 8) / 255;
					green = red;
					blue = red;
				} else {
					code -= 16;

					const remainder = code % 36;

					red = Math.floor(code / 36) / 5;
					green = Math.floor(remainder / 6) / 5;
					blue = (remainder % 6) / 5;
				}

				const value = Math.max(red, green, blue) * 2;

				if (value === 0) {
					return 30;
				}

				// eslint-disable-next-line no-bitwise
				let result = 30 + ((Math.round(blue) << 2) | (Math.round(green) << 1) | Math.round(red));

				if (value === 2) {
					result += 60;
				}

				return result;
			},
			enumerable: false,
		},
		rgbToAnsi: {
			value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
			enumerable: false,
		},
		hexToAnsi: {
			value: hex => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
			enumerable: false,
		},
	});

	return styles;
}

const ansiStyles = assembleStyles();

const ESCAPES = new Set([
	'\u001B',
	'\u009B',
]);

const END_CODE = 39;
const ANSI_ESCAPE_BELL = '\u0007';
const ANSI_CSI = '[';
const ANSI_OSC = ']';
const ANSI_SGR_TERMINATOR = 'm';
const ANSI_ESCAPE_LINK = `${ANSI_OSC}8;;`;

const wrapAnsiCode = code => `${ESCAPES.values().next().value}${ANSI_CSI}${code}${ANSI_SGR_TERMINATOR}`;
const wrapAnsiHyperlink = url => `${ESCAPES.values().next().value}${ANSI_ESCAPE_LINK}${url}${ANSI_ESCAPE_BELL}`;

// Calculate the length of words split on ' ', ignoring
// the extra characters added by ansi escape codes
const wordLengths = string => string.split(' ').map(character => stringWidth__default(character));

// Wrap a long word across multiple rows
// Ansi escape codes do not count towards length
const wrapWord = (rows, word, columns) => {
	const characters = [...word];

	let isInsideEscape = false;
	let isInsideLinkEscape = false;
	let visible = stringWidth__default(stripAnsi(rows.at(-1)));

	for (const [index, character] of characters.entries()) {
		const characterLength = stringWidth__default(character);

		if (visible + characterLength <= columns) {
			rows[rows.length - 1] += character;
		} else {
			rows.push(character);
			visible = 0;
		}

		if (ESCAPES.has(character)) {
			isInsideEscape = true;

			const ansiEscapeLinkCandidate = characters.slice(index + 1, index + 1 + ANSI_ESCAPE_LINK.length).join('');
			isInsideLinkEscape = ansiEscapeLinkCandidate === ANSI_ESCAPE_LINK;
		}

		if (isInsideEscape) {
			if (isInsideLinkEscape) {
				if (character === ANSI_ESCAPE_BELL) {
					isInsideEscape = false;
					isInsideLinkEscape = false;
				}
			} else if (character === ANSI_SGR_TERMINATOR) {
				isInsideEscape = false;
			}

			continue;
		}

		visible += characterLength;

		if (visible === columns && index < characters.length - 1) {
			rows.push('');
			visible = 0;
		}
	}

	// It's possible that the last row we copy over is only
	// ansi escape characters, handle this edge-case
	if (!visible && rows.at(-1).length > 0 && rows.length > 1) {
		rows[rows.length - 2] += rows.pop();
	}
};

// Trims spaces from a string ignoring invisible sequences
const stringVisibleTrimSpacesRight = string => {
	const words = string.split(' ');
	let last = words.length;

	while (last > 0) {
		if (stringWidth__default(words[last - 1]) > 0) {
			break;
		}

		last--;
	}

	if (last === words.length) {
		return string;
	}

	return words.slice(0, last).join(' ') + words.slice(last).join('');
};

// The wrap-ansi module can be invoked in either 'hard' or 'soft' wrap mode.
//
// 'hard' will never allow a string to take up more than columns characters.
//
// 'soft' allows long words to expand past the column length.
const exec = (string, columns, options = {}) => {
	if (options.trim !== false && string.trim() === '') {
		return '';
	}

	let returnValue = '';
	let escapeCode;
	let escapeUrl;

	const lengths = wordLengths(string);
	let rows = [''];

	for (const [index, word] of string.split(' ').entries()) {
		if (options.trim !== false) {
			rows[rows.length - 1] = rows.at(-1).trimStart();
		}

		let rowLength = stringWidth__default(rows.at(-1));

		if (index !== 0) {
			if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
				// If we start with a new word but the current row length equals the length of the columns, add a new row
				rows.push('');
				rowLength = 0;
			}

			if (rowLength > 0 || options.trim === false) {
				rows[rows.length - 1] += ' ';
				rowLength++;
			}
		}

		// In 'hard' wrap mode, the length of a line is never allowed to extend past 'columns'
		if (options.hard && lengths[index] > columns) {
			const remainingColumns = (columns - rowLength);
			const breaksStartingThisLine = 1 + Math.floor((lengths[index] - remainingColumns - 1) / columns);
			const breaksStartingNextLine = Math.floor((lengths[index] - 1) / columns);
			if (breaksStartingNextLine < breaksStartingThisLine) {
				rows.push('');
			}

			wrapWord(rows, word, columns);
			continue;
		}

		if (rowLength + lengths[index] > columns && rowLength > 0 && lengths[index] > 0) {
			if (options.wordWrap === false && rowLength < columns) {
				wrapWord(rows, word, columns);
				continue;
			}

			rows.push('');
		}

		if (rowLength + lengths[index] > columns && options.wordWrap === false) {
			wrapWord(rows, word, columns);
			continue;
		}

		rows[rows.length - 1] += word;
	}

	if (options.trim !== false) {
		rows = rows.map(row => stringVisibleTrimSpacesRight(row));
	}

	const preString = rows.join('\n');
	const pre = [...preString];

	// We need to keep a separate index as `String#slice()` works on Unicode code units, while `pre` is an array of codepoints.
	let preStringIndex = 0;

	for (const [index, character] of pre.entries()) {
		returnValue += character;

		if (ESCAPES.has(character)) {
			const {groups} = new RegExp(`(?:\\${ANSI_CSI}(?<code>\\d+)m|\\${ANSI_ESCAPE_LINK}(?<uri>.*)${ANSI_ESCAPE_BELL})`).exec(preString.slice(preStringIndex)) || {groups: {}};
			if (groups.code !== undefined) {
				const code = Number.parseFloat(groups.code);
				escapeCode = code === END_CODE ? undefined : code;
			} else if (groups.uri !== undefined) {
				escapeUrl = groups.uri.length === 0 ? undefined : groups.uri;
			}
		}

		const code = ansiStyles.codes.get(Number(escapeCode));

		if (pre[index + 1] === '\n') {
			if (escapeUrl) {
				returnValue += wrapAnsiHyperlink('');
			}

			if (escapeCode && code) {
				returnValue += wrapAnsiCode(code);
			}
		} else if (character === '\n') {
			if (escapeCode && code) {
				returnValue += wrapAnsiCode(escapeCode);
			}

			if (escapeUrl) {
				returnValue += wrapAnsiHyperlink(escapeUrl);
			}
		}

		preStringIndex += character.length;
	}

	return returnValue;
};

// For each newline, invoke the method separately
function wrapAnsi(string, columns, options) {
	return String(string)
		.normalize()
		.replaceAll('\r\n', '\n')
		.split('\n')
		.map(line => exec(line, columns, options))
		.join('\n');
}

var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => {
  __defNormalProp$3(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const originalWrite = Symbol("webpackbarWrite");
class LogUpdate {
  constructor() {
    __publicField$3(this, "keepOnBottom", false);
    __publicField$3(this, "prevLines");
    __publicField$3(this, "listening");
    __publicField$3(this, "extraLines");
    __publicField$3(this, "_streams");
    this.prevLines = null;
    this.listening = false;
    this.extraLines = "";
    this._onData = this._onData.bind(this);
    this._streams = [process.stdout, process.stderr];
  }
  render(lines) {
    this.listen();
    const wrappedLines = wrapAnsi(lines, this.columns, {
      trim: false,
      hard: true,
      wordWrap: false
    });
    const linesToWrite = wrappedLines + "\n" + this.extraLines;
    this.write(eraseLines(this.lineCount) + linesToWrite);
    this.prevLines = linesToWrite;
  }
  /**
   * The number of lines currently rendered, based on this.prevLines and the
   * terminal width. Since the terminal can be resized at any time, this value
   * should be retrieved immediately before erasing to get an accurate count.
   */
  get lineCount() {
    if (this.prevLines === null) {
      return 0;
    }
    const splitLines = this.prevLines.split("\n");
    let lineCount = 0;
    for (const line of splitLines) {
      const lineWidth = stringWidth__default(line);
      lineCount += Math.max(1, Math.ceil(lineWidth / this.columns));
    }
    return lineCount;
  }
  get columns() {
    return (process.stderr.columns || 80) - 2;
  }
  write(data) {
    const stream = process.stderr;
    if (stream.write[originalWrite]) {
      stream.write[originalWrite].call(stream, data, "utf8");
    } else {
      stream.write(data, "utf8");
    }
  }
  clear() {
    this.done();
    this.write(eraseLines(this.lineCount));
  }
  done() {
    this.stopListen();
    this.prevLines = null;
    this.extraLines = "";
  }
  _onData(data) {
    if (this.keepOnBottom) {
      this.write(eraseLines(this.lineCount));
    } else {
      this.prevLines += data;
      this.extraLines += data;
    }
  }
  _afterData() {
    if (this.keepOnBottom) {
      this.write(this.prevLines);
    }
  }
  listen() {
    if (this.listening) {
      return;
    }
    for (const stream of this._streams) {
      if (stream.write[originalWrite]) {
        continue;
      }
      const write = (data, ...args) => {
        if (!stream.write[originalWrite]) {
          return stream.write(data, ...args);
        }
        this._onData(data);
        const result = stream.write[originalWrite].call(stream, data, ...args);
        this._afterData();
        return result;
      };
      write[originalWrite] = stream.write;
      stream.write = write;
    }
    this.listening = true;
  }
  stopListen() {
    for (const stream of this._streams) {
      if (stream.write[originalWrite]) {
        stream.write = stream.write[originalWrite];
      }
    }
    this.listening = false;
  }
}
const logUpdate = new LogUpdate();

let lastRender = Date.now();
class FancyReporter {
  allDone() {
    logUpdate.done();
  }
  done(context) {
    this._renderStates(context.statesArray);
    if (context.hasErrors) {
      logUpdate.done();
    }
  }
  progress(context) {
    if (Date.now() - lastRender > 50) {
      this._renderStates(context.statesArray);
    }
  }
  _renderStates(statesArray) {
    lastRender = Date.now();
    const renderedStates = statesArray.map((c) => this._renderState(c)).join("\n\n");
    logUpdate.render("\n" + renderedStates + "\n");
  }
  _renderState(state) {
    const color = colorize(state.color);
    let line1;
    let line2;
    if (state.progress >= 0 && state.progress < 100) {
      line1 = [
        color(BULLET),
        color(state.name),
        renderBar(state.progress, state.color),
        state.message,
        `(${state.progress || 0}%)`,
        c.grey(state.details[0] || ""),
        c.grey(state.details[1] || "")
      ].join(" ");
      line2 = state.request ? " " + c.grey(ellipsisLeft(formatRequest(state.request), logUpdate.columns)) : "";
    } else {
      let icon = " ";
      if (state.hasErrors) {
        icon = CROSS;
      } else if (state.progress === 100) {
        icon = TICK;
      } else if (state.progress === -1) {
        icon = CIRCLE_OPEN;
      }
      line1 = color(`${icon} ${state.name}`);
      line2 = c.grey("  " + state.message);
    }
    return line1 + "\n" + line2;
  }
}

class SimpleReporter {
  start(context) {
    consola.info(`Compiling ${context.state.name}`);
  }
  change(context, { shortPath }) {
    consola.debug(`${shortPath} changed.`, `Rebuilding ${context.state.name}`);
  }
  done(context) {
    const { hasError, message, name } = context.state;
    consola[hasError ? "error" : "success"](`${name}: ${message}`);
  }
}

const DB = {
  loader: {
    get: (loader) => startCase(loader)
  },
  ext: {
    get: (ext) => `${ext} files`,
    vue: "Vue Single File components",
    js: "JavaScript files",
    sass: "SASS files",
    scss: "SASS files",
    unknown: "Unknown files"
  }
};
function getDescription(category, keyword) {
  if (!DB[category]) {
    return startCase(keyword);
  }
  if (DB[category][keyword]) {
    return DB[category][keyword];
  }
  if (DB[category].get) {
    return DB[category].get(keyword);
  }
  return "-";
}

function formatStats(allStats) {
  const lines = [];
  for (const category of Object.keys(allStats)) {
    const stats = allStats[category];
    lines.push(`> Stats by ${c.bold(startCase(category))}`);
    let totalRequests = 0;
    const totalTime = [0, 0];
    const data = [
      [startCase(category), "Requests", "Time", "Time/Request", "Description"]
    ];
    for (const item of Object.keys(stats)) {
      const stat = stats[item];
      totalRequests += stat.count || 0;
      const description = getDescription(category, item);
      totalTime[0] += stat.time[0];
      totalTime[1] += stat.time[1];
      const avgTime = [stat.time[0] / stat.count, stat.time[1] / stat.count];
      data.push([
        item,
        stat.count || "-",
        prettyTime__default(stat.time),
        prettyTime__default(avgTime),
        description
      ]);
    }
    data.push(["Total", totalRequests, prettyTime__default(totalTime), "", ""]);
    lines.push(createTable(data));
  }
  return `${lines.join("\n\n")}
`;
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Profiler {
  constructor() {
    __publicField$2(this, "requests");
    this.requests = [];
  }
  onRequest(request) {
    if (!request) {
      return;
    }
    if (this.requests.length > 0) {
      const lastReq = this.requests.at(-1);
      if (lastReq.start) {
        lastReq.time = process.hrtime(lastReq.start);
        delete lastReq.start;
      }
    }
    if (!request.file || request.loaders.length === 0) {
      return;
    }
    this.requests.push({
      request,
      start: process.hrtime()
    });
  }
  getStats() {
    const loaderStats = {};
    const extStats = {};
    const getStat = (stats, name) => {
      if (!stats[name]) {
        stats[name] = {
          count: 0,
          time: [0, 0]
        };
      }
      return stats[name];
    };
    const addToStat = (stats, name, count, time) => {
      const stat = getStat(stats, name);
      stat.count += count;
      stat.time[0] += time[0];
      stat.time[1] += time[1];
    };
    for (const { request, time = [0, 0] } of this.requests) {
      for (const loader of request.loaders) {
        addToStat(loaderStats, loader, 1, time);
      }
      const ext = request.file && path__default.extname(request.file).slice(1);
      addToStat(extStats, ext && ext.length > 0 ? ext : "unknown", 1, time);
    }
    return {
      ext: extStats,
      loader: loaderStats
    };
  }
  getFormattedStats() {
    return formatStats(this.getStats());
  }
}

class ProfileReporter {
  progress(context) {
    if (!context.state.profiler) {
      context.state.profiler = new Profiler();
    }
    context.state.profiler.onRequest(context.state.request);
  }
  done(context) {
    if (context.state.profiler) {
      context.state.profile = context.state.profiler.getFormattedStats();
      delete context.state.profiler;
    }
  }
  allDone(context) {
    let str = "";
    for (const state of context.statesArray) {
      const color = colorize(state.color);
      if (state.profile) {
        str += color(`
Profile results for ${c.bold(state.name)}
`) + `
${state.profile}
`;
        delete state.profile;
      }
    }
    process.stderr.write(str);
  }
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class StatsReporter {
  constructor(options) {
    __publicField$1(this, "options");
    this.options = Object.assign(
      {
        chunks: false,
        children: false,
        modules: false,
        colors: true,
        warnings: true,
        errors: true
      },
      options
    );
  }
  done(context, { stats }) {
    const str = stats.toString(this.options);
    if (context.hasErrors) {
      process.stderr.write("\n" + str + "\n");
    } else {
      context.state.statsString = str;
    }
  }
  allDone(context) {
    let str = "";
    for (const state of context.statesArray) {
      if (state.statsString) {
        str += "\n" + state.statsString + "\n";
        delete state.statsString;
      }
    }
    process.stderr.write(str);
  }
}

const reporters = {
  __proto__: null,
  basic: SimpleReporter,
  fancy: FancyReporter,
  profile: ProfileReporter,
  stats: StatsReporter
};

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const DEFAULTS = {
  name: "build",
  color: "green",
  reporters: stdEnv.isMinimal ? ["basic"] : ["fancy"],
  reporter: null
};
const DEFAULT_STATE = () => ({
  start: null,
  progress: -1,
  done: false,
  message: "",
  details: [],
  request: null,
  hasErrors: false
});
const globalStates = {};
class WebpackBar {
  constructor(options) {
    __publicField(this, "options");
    __publicField(this, "reporters");
    this.options = Object.assign({}, DEFAULTS, options);
    if (options.keepOnBottom) {
      logUpdate.keepOnBottom = true;
    }
    const _reporters = [
      ...this.options.reporters || [],
      this.options.reporter
    ].filter(Boolean).map((reporter) => {
      if (Array.isArray(reporter)) {
        return { reporter: reporter[0], options: reporter[1] };
      }
      if (typeof reporter === "string") {
        return { reporter };
      }
      return { reporter };
    });
    if (this.options.profile && !_reporters.some(({ reporter }) => reporter === "profile")) {
      _reporters.push({ reporter: "profile" });
    }
    this.reporters = _reporters.map(({ reporter, options: options2 = {} }) => {
      if (typeof reporter === "string") {
        if (this.options[reporter] === false) {
          return void 0;
        }
        options2 = { ...this.options[reporter], ...options2 };
        reporter = reporters[reporter] || require(reporter);
      }
      if (typeof reporter === "function") {
        try {
          reporter = new reporter(options2);
        } catch {
          reporter = reporter(options2);
        }
      }
      return reporter;
    }).filter(Boolean);
  }
  callReporters(fn, payload = {}) {
    for (const reporter of this.reporters) {
      if (typeof reporter[fn] === "function") {
        try {
          reporter[fn](this, payload);
        } catch (error) {
          process.stdout.write(error.stack + "\n");
        }
      }
    }
  }
  get hasRunning() {
    return objectValues(this.states).some((state) => !state.done);
  }
  get hasErrors() {
    return objectValues(this.states).some((state) => state.hasErrors);
  }
  get statesArray() {
    return objectValues(this.states).sort(
      (s1, s2) => s1.name.localeCompare(s2.name)
    );
  }
  get states() {
    return globalStates;
  }
  get state() {
    return globalStates[this.options.name];
  }
  _ensureState() {
    if (!this.states[this.options.name]) {
      this.states[this.options.name] = {
        ...DEFAULT_STATE(),
        color: this.options.color,
        name: startCase(this.options.name)
      };
    }
  }
  apply(compiler) {
    if (compiler.webpackbar) {
      return;
    }
    compiler.webpackbar = this;
    hook(compiler, "afterPlugins", () => {
      this._ensureState();
    });
    hook(compiler, "compile", () => {
      this._ensureState();
      Object.assign(this.state, {
        ...DEFAULT_STATE(),
        start: process.hrtime()
      });
      this.callReporters("start");
    });
    hook(compiler, "invalid", (fileName, changeTime) => {
      this._ensureState();
      this.callReporters("change", {
        path: fileName,
        shortPath: shortenPath(fileName),
        time: changeTime
      });
    });
    hook(compiler, "done", (stats) => {
      this._ensureState();
      if (this.state.done) {
        return;
      }
      const hasErrors = stats.hasErrors();
      const status = hasErrors ? "with some errors" : "successfully";
      const time = this.state.start ? " in " + prettyTime__default(process.hrtime(this.state.start), 2) : "";
      Object.assign(this.state, {
        ...DEFAULT_STATE(),
        progress: 100,
        done: true,
        message: `Compiled ${status}${time}`,
        hasErrors
      });
      this.callReporters("progress");
      this.callReporters("done", { stats });
      if (!this.hasRunning) {
        this.callReporters("beforeAllDone");
        this.callReporters("allDone");
        this.callReporters("afterAllDone");
      }
    });
  }
  updateProgress(percent = 0, message = "", details = []) {
    const progress = Math.floor(percent * 100);
    const activeModule = details.pop();
    if (this.state.done) {
      return;
    }
    Object.assign(this.state, {
      progress,
      message: message || "",
      details,
      request: parseRequest(activeModule)
    });
    this.callReporters("progress");
  }
}

exports.WebpackBar = WebpackBar;
