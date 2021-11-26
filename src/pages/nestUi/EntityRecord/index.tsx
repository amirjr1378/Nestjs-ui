import { fetchOneEntityRecord, fetchOneEntityRecordProperties } from '@/services/nest-ui';
import { PageContainer } from '@ant-design/pro-layout';
import { isEmpty } from 'lodash';
import React, { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import ProForm from '@ant-design/pro-form';
import RecordFields from './components/RecordFields';
import type { EntityRecordPropertyType } from '@/types/Entity';

interface Props {
  match: {
    params: {
      name: string;
      id: string;
    };
  };
}

const EntityRecord = (props: Props) => {
  const { name: entityName, id: entityID } = props.match.params;
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<Record<string, any>>({});
  const [recordProperties, setRecordProperties] = useState<EntityRecordPropertyType[]>([]);

  console.log(record, recordProperties);

  const fetchRecord = () => {
    return fetchOneEntityRecord({ entityID: Number(entityID), entityName }).then(setRecord);
  };

  const fetchRecordProperties = () => {
    return fetchOneEntityRecordProperties(entityName).then(setRecordProperties);
  };

  const handleEdit = (values: Record<string, any>) => {
    console.log('values', values);
    setLoading(true);
    // update rest
    return fetchRecord().finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchRecord(), fetchRecordProperties()]).finally(() => setLoading(false));
  }, [entityName, entityID]);

  return (
    <PageContainer loading={isEmpty(record)}>
      <Spin spinning={loading}>
        <ProForm onFinish={handleEdit} initialValues={record}>
          <Card>
            <RecordFields properties={recordProperties.filter((item) => !item.isRelationField)} />
          </Card>
          <br />
          <br />
        </ProForm>
      </Spin>
    </PageContainer>
  );
};

export default EntityRecord;
