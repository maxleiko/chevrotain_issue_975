import { Lexer, createToken, CstParser } from 'chevrotain';

const ARRAY_TYPE = /int|long|ulong|double|bool/;

// ========== TOKENS ==========
const WhiteSpace = createToken({ name: 'WhiteSpace', pattern: /\s+/, group: Lexer.SKIPPED });

// comments
const AbsComment = createToken({ name: 'AbsComment', pattern: Lexer.NA });
const SingleLineComment = createToken({
  name: 'SingleLineComment',
  pattern: /\/\/.*/,
  categories: AbsComment,
  group: Lexer.SKIPPED,
});
const MultipleLineComment = createToken({
  name: 'MultipleLineComment',
  pattern: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//,
  categories: AbsComment,
  // note that comments could span multiple lines.
  // forgetting to enable this flag will cause inaccuracies in the lexer location tracking.
  line_breaks: true,
  group: Lexer.SKIPPED,
});
const TripleSlash = createToken({
  name: 'TripleSlash',
  pattern: /\/\/\//,
  categories: AbsComment,
  group: Lexer.SKIPPED,
});

// any Identifier including reserved keyword
const IdentifierName = createToken({ name: 'IdentifierName', pattern: Lexer.NA });
const AbsKeyword = createToken({
  name: 'AbsKeyword',
  pattern: Lexer.NA,
  categories: IdentifierName,
});

// an Identifier, but not a reserved keyword
const Identifier = createToken({ name: 'Identifier', pattern: /\w+/, categories: IdentifierName });

// keywords
const Var = createToken({ name: 'Var', pattern: /var/, categories: AbsKeyword, longer_alt: Identifier });
const Static = createToken({ name: 'Static', pattern: /static/, categories: AbsKeyword, longer_alt: Identifier });
const Func = createToken({ name: 'Func', pattern: /function/, categories: AbsKeyword, longer_alt: Identifier });
const Open = createToken({ name: 'Open', pattern: /open/, categories: AbsKeyword, longer_alt: Identifier });
const Type = createToken({ name: 'Type', pattern: /type/, categories: AbsKeyword, longer_alt: Identifier });
const New = createToken({ name: 'New', pattern: /new/, categories: Identifier, longer_alt: Identifier });
const ReturnTk = createToken({ name: 'ReturnTk', pattern: /return/, categories: AbsKeyword, longer_alt: Identifier });
const Private = createToken({ name: 'Private', pattern: /private/, categories: AbsKeyword, longer_alt: Identifier });
const If = createToken({ name: 'If', pattern: /if/, categories: AbsKeyword, longer_alt: Identifier });
const Is = createToken({ name: 'Is', pattern: /is/, categories: AbsKeyword, longer_alt: Identifier });
const Else = createToken({ name: 'Else', pattern: /else/, categories: AbsKeyword, longer_alt: Identifier });
const While = createToken({ name: 'While', pattern: /while/, categories: AbsKeyword, longer_alt: Identifier });
const For = createToken({ name: 'For', pattern: /for/, categories: AbsKeyword, longer_alt: Identifier });
const Import = createToken({ name: 'Import', pattern: /import/, categories: AbsKeyword, longer_alt: Identifier });

// punctuators
const AbsPunctuator = createToken({ name: 'AbsPunctuator', pattern: Lexer.NA });
const Dot = createToken({ name: 'Dot', pattern: /\./, categories: AbsPunctuator });
const Hash = createToken({ name: 'Hash', pattern: /#/, categories: AbsPunctuator });
const Comma = createToken({ name: 'Comma', pattern: /,/, categories: AbsPunctuator });
const LCurly = createToken({ name: 'LCurly', pattern: /{/, categories: AbsPunctuator });
const RCurly = createToken({ name: 'RCurly', pattern: /}/, categories: AbsPunctuator });
const LParen = createToken({ name: 'LParen', pattern: /\(/, categories: AbsPunctuator });
const RParen = createToken({ name: 'RParen', pattern: /\)/, categories: AbsPunctuator });
const LBracket = createToken({ name: 'LBracket', pattern: /\[/, categories: AbsPunctuator });
const RBracket = createToken({ name: 'RBracket', pattern: /]/, categories: AbsPunctuator });
const Colon = createToken({ name: 'Colon', pattern: /:/, categories: AbsPunctuator });
const SemiColon = createToken({ name: 'SemiColon', pattern: /;/, categories: AbsPunctuator });
const ExclMark = createToken({ name: 'ExclMark', pattern: /!/, categories: AbsPunctuator });
const PlusPlus = createToken({ name: 'PlusPlus', pattern: /\+\+/, categories: AbsPunctuator });
const MinusMinus = createToken({ name: 'MinusMinus', pattern: /--/, categories: AbsPunctuator });

// multiplicative operators
const AbsMulOp = createToken({ name: 'AbsMulOp', pattern: Lexer.NA, categories: AbsPunctuator });
const Asterisk = createToken({ name: 'Asterisk', pattern: /\*/, categories: AbsMulOp });
const Slash = createToken({ name: 'Slash', pattern: /\//, categories: AbsMulOp });
const Percent = createToken({ name: 'Percent', pattern: /%/, categories: AbsMulOp });
const Caret = createToken({ name: 'Caret', pattern: /\^/, categories: AbsMulOp });

// additive operators
const AbsAddOp = createToken({ name: 'AbsAddOp', pattern: Lexer.NA, categories: AbsPunctuator });
const Plus = createToken({ name: 'Plus', pattern: /\+/, categories: AbsAddOp });
const Minus = createToken({ name: 'Minus', pattern: /-/, categories: AbsAddOp });

// relational operators
const AbsRelOp = createToken({ name: 'AbsRelOp', pattern: Lexer.NA });
const Less = createToken({ name: 'Less', pattern: /</, categories: AbsRelOp });
const Greater = createToken({ name: 'Greater', pattern: />/, categories: AbsRelOp });
const LessEq = createToken({ name: 'LessEq', pattern: /<=/, categories: AbsRelOp });
const GreaterEq = createToken({ name: 'GreaterEq', pattern: />=/, categories: AbsRelOp });
const AmpAmp = createToken({ name: 'AmpAmp', pattern: /&&/, categories: AbsRelOp });
const Pipe = createToken({ name: 'Pipe', pattern: /\|/, categories: AbsRelOp });
const PipePipe = createToken({ name: 'PipePipe', pattern: /\|\|/, categories: AbsRelOp });

// equality operators
const AbsEqOp = createToken({ name: 'AbsEqOp', pattern: Lexer.NA, categories: AbsPunctuator });
const EqEq = createToken({ name: 'EqEq', pattern: /==/, categories: AbsEqOp });
const ExclMarkEq = createToken({ name: 'ExclMarkEq', pattern: /!=/, categories: AbsEqOp });

// assignment operators
const AbsAssignOp = createToken({ name: 'AbsAssignOp', pattern: Lexer.NA, categories: AbsPunctuator });
const Eq = createToken({ name: 'Eq', pattern: /=/, categories: AbsAssignOp });
const PlusEq = createToken({ name: 'PlusEq', pattern: /\+=/, categories: AbsAssignOp });
const MinusEq = createToken({ name: 'MinusEq', pattern: /-=/, categories: AbsAssignOp });
const AsteriskEq = createToken({ name: 'AsteriskEq', pattern: /\*=/, categories: AbsAssignOp });
const PercentEq = createToken({ name: 'PercentEq', pattern: /%=/, categories: AbsAssignOp });
const SlashEq = createToken({ name: 'SlashEq', pattern: /\/=/, categories: AbsAssignOp });

// literals
const AbsLiteral = createToken({ name: 'AbsLiteral', pattern: Lexer.NA });
const NullTk = createToken({ name: 'NullTk', pattern: /null/, categories: [IdentifierName, AbsLiteral] });
const ThisTk = createToken({ name: 'ThisTk', pattern: /this/, categories: [IdentifierName, AbsLiteral] });
const NumLiteral = createToken({
  name: 'NumLiteral',
  pattern: /[\-]?[0-9]+[.]?[0-9]*([eE]-?[\d]+|[dDlL])?/,
  categories: AbsLiteral,
});

// string literals
const AbsStringLiteral = createToken({ name: 'AbsStringLiteral', pattern: Lexer.NA, categories: AbsLiteral });
const SingleQuote = createToken({
  name: 'SingleQuote',
  pattern: /'(:?[^\\'\n\r]+|\\(:?[bfnrtv'\\/]|u[0-9a-fA-F]{4}))*'/,
  categories: AbsStringLiteral,
});
const DoubleQuote = createToken({
  name: 'DoubleQuote',
  pattern: /"(:?[^\\"\n\r]+|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/,
  categories: AbsStringLiteral,
});
const BackQuote = createToken({
  name: 'BackQuote',
  pattern: /`(:?[^\\`\n\r]+|\\(:?[bfnrtv`\\/]|u[0-9a-fA-F]{4}))*`/,
  categories: AbsLiteral,
});

// boolean literals
const AbsBooleanLiteral = createToken({ name: 'AbsBooleanLiteral', pattern: Lexer.NA, categories: AbsLiteral });
const TrueTk = createToken({ name: 'TrueTk', pattern: /true/, categories: [IdentifierName, AbsBooleanLiteral] });
const FalseTk = createToken({ name: 'FalseTk', pattern: /false/, categories: [IdentifierName, AbsBooleanLiteral] });

export const tokens = [
  // !!! Order is important here !!!
  WhiteSpace,
  // LineTerminator,
  TripleSlash,
  SingleLineComment,
  MultipleLineComment,
  IdentifierName,
  AbsKeyword,
  Var,
  Static,
  Func,
  Open,
  Type,
  New,
  ReturnTk,
  Private,
  If,
  Is,
  Else,
  While,
  For,
  Import,
  // ThisTk,
  AbsPunctuator,
  LCurly,
  RCurly,
  LParen,
  RParen,
  LBracket,
  RBracket,
  Dot,
  SemiColon,
  Comma,
  PlusPlus,
  MinusMinus,
  Hash,
  Colon,
  AbsMulOp,
  AbsAddOp,
  // AbsShiftOperator,
  // LessLess,
  // MoreMore,
  // MoreMoreMore,
  AbsRelOp,
  LessEq,
  GreaterEq,
  AmpAmp,
  PipePipe,
  Pipe,
  Less,
  Greater,
  AbsEqOp,
  EqEq,
  ExclMarkEq,
  ExclMark,
  AbsAssignOp,
  Eq,
  PlusEq,
  MinusEq,
  Plus,
  Minus,
  AsteriskEq,
  PercentEq,
  SlashEq,
  Asterisk,
  Slash,
  Percent,
  Caret,
  AbsLiteral,
  NullTk,
  ThisTk,
  AbsBooleanLiteral,
  TrueTk,
  FalseTk,
  NumLiteral,
  Identifier,
  BackQuote,
  SingleQuote,
  DoubleQuote,
  AbsStringLiteral,
];

// ========== PARSER ==========
class GreyCatParser extends CstParser {

  constructor() {
    super(tokens, { recoveryEnabled: true, outputCst: true });
    this.performSelfAnalysis();
  }

  public greycat = this.RULE('greycat', () => {
    this.MANY(() => {
      this.CONSUME(Import);
      this.CONSUME(AbsStringLiteral);
    });
    this.MANY1(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.funcDecl) },
        { ALT: () => this.SUBRULE(this.typeDecl) },
        { ALT: () => this.SUBRULE(this.stmt) },
      ]);
      this.OPTION(() => this.CONSUME(SemiColon));
    });
  });

  private stmt = this.RULE('stmt', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.block) },
      { ALT: () => this.SUBRULE(this.ifStmt) },
      { ALT: () => this.SUBRULE(this.whileStmt) },
      { ALT: () => this.SUBRULE(this.forStmt) },
      { ALT: () => this.SUBRULE(this.varStmt) },
      { ALT: () => this.SUBRULE(this.exprStmt) },
      { ALT: () => this.SUBRULE(this.returnStmt) },
    ]);
    this.OPTION(() => this.CONSUME(SemiColon));
  });

  private block = this.RULE('block', () => {
    this.CONSUME(LCurly);
    this.AT_LEAST_ONE(() => this.SUBRULE(this.stmt));
    this.CONSUME(RCurly);
  });

  private logicBlock = this.RULE('logicBlock', () => {
    this.CONSUME(LCurly);
    this.MANY(() => this.SUBRULE(this.stmt));
    this.CONSUME(RCurly);
  });

  private ifStmt = this.RULE('ifStmt', () => {
    this.CONSUME(If);
    this.CONSUME(LParen);
    this.SUBRULE(this.binaryExpr);
    this.CONSUME(RParen);
    this.SUBRULE(this.logicBlock);
    this.OPTION(() => this.SUBRULE(this.elseStmt));
  });

  private elseStmt = this.RULE('elseStmt', () => {
      this.CONSUME(Else);
      this.OR([
        { ALT: () => this.SUBRULE(this.logicBlock) },
        { ALT: () => this.SUBRULE(this.ifStmt) },
      ]);
    },
  );

  private whileStmt = this.RULE('whileStmt', () => {
    this.CONSUME(While);
    this.CONSUME(LParen);
    this.SUBRULE(this.binaryExpr);
    this.CONSUME(RParen);
    this.SUBRULE(this.logicBlock);
  });

  private forStmt = this.RULE('forStmt', () => {
    this.CONSUME(For);
    this.CONSUME(LParen);
    this.CONSUME(Identifier);
    this.CONSUME(Eq);
    this.SUBRULE(this.binaryExpr);
    this.CONSUME(SemiColon);
    this.SUBRULE1(this.binaryExpr);
    this.CONSUME1(SemiColon);
    this.SUBRULE(this.exprStmt);
    this.CONSUME(RParen);
    this.SUBRULE(this.logicBlock);
  });

  private funcDecl = this.RULE('funcDecl', () => {
    this.CONSUME(Func);
    this.CONSUME(Identifier);
    this.SUBRULE(this.inlineFunc);
  });

  private paramsDecl = this.RULE('paramsDecl', () => {
    this.OPTION(() => {
      this.SUBRULE(this.paramDecl);
      this.MANY(() => {
        this.CONSUME(Comma);
        this.SUBRULE1(this.paramDecl);
      });
      this.OPTION1(() => this.CONSUME1(Comma));
    });
  });

  private paramDecl = this.RULE('paramDecl', () => {
    this.CONSUME(Identifier);
    this.CONSUME(Colon);
    this.SUBRULE(this.typeList);
  });

  private typeDecl = this.RULE('typeDecl', () => {
    this.OPTION(() => this.CONSUME(Open));
    this.CONSUME(Type);
    this.CONSUME(Identifier);
    this.CONSUME(LCurly);
    this.MANY(() => this.SUBRULE(this.typeStmt));
    this.CONSUME(RCurly);
  });

  private typeStmt = this.RULE('typeStmt', () => {
    this.OPTION(() => {
      this.OR([
        {
          ALT: () => {
            this.CONSUME(Private);
            this.OPTION1(() => this.CONSUME(Static));
          },
        },
        {
          ALT: () => {
            this.CONSUME1(Static);
            this.OPTION2(() => this.CONSUME1(Private));
          },
        },
      ]);
    });
    this.OR1([
      { ALT: () => this.SUBRULE(this.funcDecl) },
      { ALT: () => this.SUBRULE(this.attDecl) },
    ]);
    this.OPTION3(() => this.CONSUME(SemiColon));
  });

  private attDecl = this.RULE('attDecl', () => {
    this.CONSUME(Identifier);
    this.CONSUME(Colon);
    this.SUBRULE(this.typeList);
    this.OPTION1(() => this.SUBRULE(this.initializer));
  });

  private typeList = this.RULE('typeList', () => {
    this.SUBRULE(this.typeIdent);
    this.MANY(() => {
      this.CONSUME(Pipe);
      this.SUBRULE1(this.typeIdent);
    });
  });

  private typeIdent = this.RULE('typeIdent', () => {
    this.CONSUME(Identifier);
    this.OPTION(() => {
      this.CONSUME(Less);
      this.SUBRULE(this.typeList);
      this.CONSUME(Greater);
    });
  });

  private nodeProps = this.RULE('nodeProps', () => {
    this.OPTION(() => {
      this.SUBRULE(this.nodeProp);
      this.MANY(() => {
        this.CONSUME(Comma);
        this.SUBRULE1(this.nodeProp);
      });
      this.OPTION1(() => this.CONSUME1(Comma));
    });
  });

  private nodeProp = this.RULE('nodeProp', () => {
    this.CONSUME(IdentifierName);
    this.CONSUME(Colon);
    this.SUBRULE(this.binaryExpr);
  });

  private funcParams = this.RULE('funcParams', () => {
    this.OPTION(() => {
      this.SUBRULE(this.binaryExpr);
      this.MANY(() => {
        this.CONSUME(Comma);
        this.SUBRULE1(this.binaryExpr);
      });
      this.OPTION1(() => this.CONSUME1(Comma));
    });
  });

  private exprStmt = this.RULE('exprStmt', () => {
    this.SUBRULE(this.binaryExpr);
  });

  private returnStmt = this.RULE('returnStmt', () => {
    this.CONSUME(ReturnTk);
    this.SUBRULE(this.binaryExpr);
  });

  private varStmt = this.RULE('varStmt', () => {
    this.CONSUME(Var);
    this.CONSUME(Identifier);
    this.OPTION(() => {
      this.CONSUME(Colon);
      this.SUBRULE(this.typeList);
    });
    this.OPTION1(() => this.SUBRULE(this.initializer));
  });

  private initializer = this.RULE('initializer', () => {
    this.CONSUME(Eq);
    this.SUBRULE(this.binaryExpr);
  });

  private nodeLiteral = this.RULE('nodeLiteral', () => {
    this.CONSUME(LCurly);
    this.SUBRULE(this.nodeProps);
    this.CONSUME(RCurly);
  });

  private arrayLiteral = this.RULE('arrayLiteral', () => {
    this.CONSUME1(LBracket);
    this.OPTION1(() => {
      this.SUBRULE(this.binaryExpr);
      this.MANY(() => {
        this.CONSUME(Comma);
        this.SUBRULE1(this.binaryExpr);
      });
      this.OPTION2(() => this.CONSUME1(Comma));
    });
    this.CONSUME(RBracket);
  });

  private inlineFunc = this.RULE('inlineFunc', () => {
    this.CONSUME(LParen);
    this.SUBRULE(this.paramsDecl);
    this.CONSUME(RParen);
    this.OPTION(() => {
      this.CONSUME(Colon);
      this.SUBRULE(this.typeList);
    });
    this.SUBRULE(this.logicBlock);
  });

  private binaryExpr = this.RULE('binaryExpr', () => {
    this.SUBRULE(this.unaryExpr);
    this.OPTION(() => {
      return this.OR([
        {
          ALT: () => {
            this.OR1([
              { ALT: () => this.CONSUME(AbsAssignOp) },
              { ALT: () => this.CONSUME(AbsEqOp) },
              { ALT: () => this.CONSUME(AbsRelOp) },
              { ALT: () => this.CONSUME(AbsMulOp) },
              { ALT: () => this.CONSUME(AbsAddOp) },
            ]);
            this.SUBRULE1(this.binaryExpr);
          },
        },
        {
          ALT: () => {
            this.CONSUME(Is);
            this.CONSUME(Identifier);
          },
        },
      ]);
    });
  });

  private unaryExpr = this.RULE('unaryExpr', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.postfixExpr) },
      { ALT: () => this.SUBRULE(this.prefixExpr) },
    ]);
  });

  private primaryExpr = this.RULE('primaryExpr', () => {
    this.OR([
      {
        ALT: () => {
          const token = this.CONSUME(Identifier);
          this.OPTION({
            GATE: () => {
              const nextToken = this.LA(1);
              if (nextToken.image === '[') {
                return !!token.image.match(ARRAY_TYPE);
              }
              return nextToken.image === '{';
            },
            DEF: () => {
              return this.OR1([
                { ALT: () => this.SUBRULE(this.arrayLiteral) },
                { ALT: () => this.SUBRULE(this.nodeLiteral) },
              ]);
            },
          });
        },
      },
      {
        ALT: () => {
          this.CONSUME(Hash);
          this.CONSUME1(Identifier);
        },
      },
      { ALT: () => this.CONSUME(NullTk) },
      { ALT: () => this.CONSUME(ThisTk) },
      { ALT: () => this.CONSUME(AbsBooleanLiteral) },
      { ALT: () => this.CONSUME(NumLiteral) },
      { ALT: () => this.CONSUME(BackQuote) },
      { ALT: () => this.CONSUME(AbsStringLiteral) },
      { ALT: () => this.SUBRULE1(this.nodeLiteral) },
      { ALT: () => this.SUBRULE1(this.arrayLiteral) },
      { ALT: () => this.SUBRULE(this.inlineFunc) },
      { ALT: () => this.SUBRULE(this.parenExpr) },
    ]);
  });

  private parenExpr = this.RULE('parenExpr', () => {
     this.CONSUME(LParen);
     this.SUBRULE(this.binaryExpr);
     this.CONSUME(RParen);
  });

  private prefixExpr = this.RULE('prefixExpr', () => {
    this.OR([
      { ALT: () => this.CONSUME(ExclMark) },
      { ALT: () => this.CONSUME(Plus) },
      { ALT: () => this.CONSUME(Minus) },
    ]);
  });

  private postfixExpr = this.RULE('postfixExpr', () => {
    this.SUBRULE(this.memberExpr);
    this.OPTION(() => {
      this.OR([
        { ALT: () => this.CONSUME(PlusPlus) },
        { ALT: () => this.CONSUME(MinusMinus) },
      ]);
    });
  });

  private memberExpr = this.RULE('memberExpr', () => {
    this.OPTION(() => this.CONSUME(New));
    this.SUBRULE(this.primaryExpr);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.dotMember) },
        { ALT: () => this.SUBRULE(this.dblColonMember) },
        {
          // BoxMember
          ALT: () => {
            this.CONSUME(LBracket);
            this.SUBRULE(this.binaryExpr);
            this.CONSUME(RBracket);
          },
        },
        {
          // FuncParams
          ALT: () => {
            this.CONSUME(LParen);
            this.SUBRULE(this.funcParams);
            this.CONSUME(RParen);
          },
        },
        {
          // NonNullAssert
          ALT: () => this.CONSUME(ExclMark),
        },
      ]);
    });
  });

  private dotMember = this.RULE('dotMember', () => {
    this.CONSUME(Dot);
    this.CONSUME(IdentifierName);
  });

  private dblColonMember = this.RULE('dblColonMember', () => {
    this.CONSUME(Colon);
    this.CONSUME1(Colon);
    this.CONSUME(IdentifierName);
  });
}

const parser = new GreyCatParser();
const lexer = new Lexer(tokens, { ensureOptimizations: true });

export { lexer, parser, GreyCatParser };
