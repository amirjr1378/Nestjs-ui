import { fetchEntityRecords } from '@/services/nest-ui';
import { PageContainer } from '@ant-design/pro-layout';
import type { ColumnsState, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { Link } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface Props {
  match: {
    params: {
      name: string;
    };
  };
}

const EntityRecords = (props: Props) => {
  const entityName = props.match.params.name;
  const [columns, setColumns] = useState<ProColumns[]>([]);
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({}); // for settings columns to show only 6 column at first

  const createColumns = (sampleData: Record<string, any>) => {
    const newColumnsStateMap: Record<string, ColumnsState> = {
      actions: {
        fixed: 'right',
      },
    };
    const newColumns: ProColumns[] = Object.keys(sampleData).map((entityFieldName, index) => {
      if (index > 5) {
        newColumnsStateMap[entityFieldName] = { show: false };
      }
      return {
        dataIndex: entityFieldName,
        key: entityFieldName,
        title: entityFieldName,
        search: false,
        ellipsis: true,
      };
    });
    newColumns.push({
      dataIndex: 'actions',
      hideInSetting: true,
      render: (_, entity) => (
        <Link to={`/admin/entities/records/${entityName}/${entity.id}`}>
          <EditOutlined />
        </Link>
      ),
    });

    setColumns(newColumns as any);
    if (isEmpty(columnsStateMap)) {
      setColumnsStateMap(newColumnsStateMap);
    }
  };

  return (
    <PageContainer title={entityName}>
      <ProTable
        rowKey="id"
        request={(...args) =>
          fetchEntityRecords(entityName)(...args).then((res: { data: any[] }) => {
            createColumns(res?.data?.[0]);
            return res;
          })
        }
        pagination={{
          defaultCurrent: 1,
          pageSize: 8,
          hideOnSinglePage: true,
          showSizeChanger: false,
        }}
        columns={columns}
        scroll={{ x: true }}
        columnsState={{
          value: columnsStateMap,
          onChange: setColumnsStateMap,
        }}
        search={false}
      />
    </PageContainer>
  );
};

export default EntityRecords;
