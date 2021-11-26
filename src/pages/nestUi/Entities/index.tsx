import React, { useState, useEffect, useMemo } from 'react';
import { getEntities } from '@/services/nest-ui';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, List, Input } from 'antd';
import s from './styles.module.less';
import type { EntityType } from '@/types/Entity';
import { useHistory } from 'umi';
import { debounce } from 'lodash';

const NestJsEntitiesList = () => {
  const [entities, setEntities] = useState<EntityType[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const listDataSource = useMemo(
    () =>
      entities.filter((item) =>
        item.name?.toLocaleLowerCase()?.includes(searchKeyWord.toLocaleLowerCase()),
      ),
    [searchKeyWord, entities?.length],
  );

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = debounce((e) => {
    setSearchKeyWord(e.target.value);
  }, 300);

  useEffect(() => {
    setLoading(true);
    getEntities()
      .then(setEntities)
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageContainer>
      <Card
        className={s.cardContainer}
        title={<Input.Search placeholder="جستجو" onChange={handleSearch} />}
      >
        <List
          dataSource={listDataSource}
          loading={loading}
          renderItem={(item) => (
            <List.Item
              className={s.listItem}
              key={item.name}
              onClick={() => history.push(`/admin/entities/records/${item.name}`)}
            >
              {item.name}
            </List.Item>
          )}
        />
      </Card>
    </PageContainer>
  );
};

export default NestJsEntitiesList;
