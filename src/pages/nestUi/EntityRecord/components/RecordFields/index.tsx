import type { EntityRecordPropertyType } from '@/types/Entity';
import { ProFormDigit, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import React from 'react';
import s from './styles.module.less';

interface Props {
  properties?: EntityRecordPropertyType[];
}

const RecordFields = ({ properties }: Props) => {
  return (
    <div className={s.fieldsWrapper}>
      {properties?.map((item) => {
        switch (item.type) {
          case 'string':
            return <ProFormText width="md" label={item.propertyName} name={item.propertyName} />;
          case 'longtext':
            return (
              <ProFormTextArea width="lg" label={item.propertyName} name={item.propertyName} />
            );

          case 'int':
          case 'bigint':
            return <ProFormDigit width="md" label={item.propertyName} name={item.propertyName} />;

          default:
            return null;
        }
      })}
    </div>
  );
};

export default RecordFields;
