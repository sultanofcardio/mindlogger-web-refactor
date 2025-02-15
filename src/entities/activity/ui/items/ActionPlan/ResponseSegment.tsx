import { useXScaledDimension } from './hooks';
import { ActivitiesPhrasalData, ActivityPhrasalDataSliderRowContext } from './phrasalData';

import { PhrasalTemplateItemResponseField } from '~/entities/activity';
import { useActionPlanTranslation } from '~/entities/activity/lib/useActionPlanTranslation';
import Box from '~/shared/ui/Box';
import Text from '~/shared/ui/Text';

const isAnswersSkipped = (answers: string[]): boolean => {
  if (!answers || answers.length <= 0) {
    return true;
  }

  let allFalsy = true;
  for (const answer of answers) {
    if (answer !== null && answer !== undefined && answer.trim().length > 0) {
      allFalsy = false;
    }
  }

  return allFalsy;
};

type FieldValueTransformer = (value: string) => string;
const identity: FieldValueTransformer = (value) => value;

type FieldValuesJoiner = (values: string[]) => string | JSX.Element[];
const joinWithComma: FieldValuesJoiner = (values) => values.join(', ');

type ResponseSegmentProps = {
  phrasalData: ActivitiesPhrasalData;
  field: PhrasalTemplateItemResponseField;
  isAtStart?: boolean;
};

export const ResponseSegment = ({ phrasalData, field, isAtStart }: ResponseSegmentProps) => {
  const { t } = useActionPlanTranslation();
  const listPadding = useXScaledDimension(40);

  const fieldDisplayMode = field.displayMode;
  const fieldPhrasalData = phrasalData[field.itemName];

  if (!fieldPhrasalData) {
    // This really shouldn't happen. But we should still eliminate the logical
    // path for nil/falsy values anyway.
    return null;
  }

  const fieldPhrasalDataType = fieldPhrasalData.type;

  let transformValue = identity;
  let joinSentenceWords = joinWithComma;

  if (fieldPhrasalData.context.itemResponseType === 'sliderRows') {
    const ctx = fieldPhrasalData.context as ActivityPhrasalDataSliderRowContext;
    transformValue = (value) => {
      return t('sliderValue', { value, total: ctx.maxValues[field.itemIndex] });
    };
  } else if (fieldPhrasalData.context.itemResponseType === 'timeRange') {
    joinSentenceWords = (values) => values.join(' - ');
  } else if (fieldPhrasalData.context.itemResponseType === 'paragraphText') {
    joinSentenceWords = (values) =>
      values.map((item, index) => <div key={index}>{item || ' '}</div>);
  }

  let words: string[];
  if (fieldPhrasalDataType === 'array') {
    words = isAnswersSkipped(fieldPhrasalData.values)
      ? [t('questionSkipped')]
      : fieldPhrasalData.values.map(transformValue);
  } else if (fieldPhrasalDataType === 'paragraph') {
    words = isAnswersSkipped(fieldPhrasalData.values)
      ? [t('questionSkipped')]
      : fieldPhrasalData.values
          .flatMap((value) => value.split(/\r?\n/)) // Split each paragraph by newlines
          .map(transformValue);
  } else if (fieldPhrasalDataType === 'indexed-array') {
    const indexedAnswers = fieldPhrasalData.values[field.itemIndex] || [];
    words = isAnswersSkipped(indexedAnswers)
      ? [t('questionSkipped')]
      : indexedAnswers.map(transformValue);
  } else if (fieldPhrasalDataType === 'matrix') {
    let renderByRowValues: boolean;

    if (
      fieldDisplayMode === 'sentence_option_row' ||
      fieldDisplayMode === 'bullet_list_option_row'
    ) {
      renderByRowValues = false;
    } else if (
      fieldDisplayMode === 'sentence_row_option' ||
      fieldDisplayMode === 'bullet_list_text_row'
    ) {
      renderByRowValues = true;
    } else {
      // The admin UI actually allows matrix type items to have `sentence` as
      // their display mode. So in this case, we're just going to assume the
      // effective render order for the values to be "by row".
      renderByRowValues = true;
    }

    if (renderByRowValues) {
      words = fieldPhrasalData.values.byRow
        .map(({ label, values }) => {
          const transformedValues = isAnswersSkipped(values)
            ? [t('questionSkipped')]
            : values.map(transformValue);
          return transformedValues.map((transformedValue) => `${label} ${transformedValue}`);
        })
        .flat();
    } else {
      words = fieldPhrasalData.values.byColumn
        .map(({ label, values }) => {
          const transformedValues = isAnswersSkipped(values)
            ? [t('questionSkipped')]
            : values.map(transformValue);
          return transformedValues.map((transformedValue) => `${label} ${transformedValue}`);
        })
        .flat();
    }
  } else {
    // This also shouldn't happen. But including a `else` here allows all
    // previous branches to have explicitly defined condition, so it's more
    // clear this way.
    throw new Error(`Invalid phrasal data type: ${fieldPhrasalDataType}`);
  }

  return (
    <Text component="span" fontWeight="700" fontSize="inherit" lineHeight="inherit">
      {fieldDisplayMode === 'bullet_list' ||
      fieldDisplayMode === 'bullet_list_option_row' ||
      fieldDisplayMode === 'bullet_list_text_row' ? (
        <>
          {isAtStart ? null : (
            <span>
              &nbsp;
              <br />
            </span>
          )}
          <Box
            component="ul"
            marginTop={isAtStart ? `0px` : undefined}
            paddingLeft={`${listPadding}px`}
          >
            {words.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </Box>
        </>
      ) : (
        <>
          {isAtStart ? '' : ' '}
          {joinSentenceWords(words)}
        </>
      )}
    </Text>
  );
};
