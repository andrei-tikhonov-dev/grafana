import { css } from '@emotion/css';
import React from 'react';

import { Avatar, CustomCellRendererProps, useStyles2 } from '@grafana/ui';

import { TeamMember } from '../../types';

const getStyles = () => {
  return {
    cell: css`
      display: flex;
      align-items: center;
      gap: 10px;
    `,
  };
};

const defaultAvatar =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iMTIiIGZpbGw9IiNGRjgzMkQiLz4KPHBhdGggZD0iTTExLjk5OTkgMTIuMDAwMkMxMS4wODMzIDEyLjAwMDIgMTAuMjk4NSAxMS42NzM4IDkuNjQ1NzUgMTEuMDIxQzguOTkyOTcgMTAuMzY4MiA4LjY2NjU5IDkuNTgzNSA4LjY2NjU5IDguNjY2ODNDOC42NjY1OSA3Ljc1MDE2IDguOTkyOTcgNi45NjU0NCA5LjY0NTc1IDYuMzEyNjZDMTAuMjk4NSA1LjY1OTg5IDExLjA4MzMgNS4zMzM1IDExLjk5OTkgNS4zMzM1QzEyLjkxNjYgNS4zMzM1IDEzLjcwMTMgNS42NTk4OSAxNC4zNTQxIDYuMzEyNjZDMTUuMDA2OSA2Ljk2NTQ0IDE1LjMzMzMgNy43NTAxNiAxNS4zMzMzIDguNjY2ODNDMTUuMzMzMyA5LjU4MzUgMTUuMDA2OSAxMC4zNjgyIDE0LjM1NDEgMTEuMDIxQzEzLjcwMTMgMTEuNjczOCAxMi45MTY2IDEyLjAwMDIgMTEuOTk5OSAxMi4wMDAyWk01LjMzMzI1IDE3LjAwMDJWMTYuMzMzNUM1LjMzMzI1IDE1Ljg2MTMgNS40NTQ3OCAxNS40MjcyIDUuNjk3ODQgMTUuMDMxNEM1Ljk0MDg5IDE0LjYzNTYgNi4yNjM4MSAxNC4zMzM1IDYuNjY2NTkgMTQuMTI1MkM3LjUyNzcgMTMuNjk0NiA4LjQwMjcgMTMuMzcxNyA5LjI5MTU5IDEzLjE1NjRDMTAuMTgwNSAxMi45NDExIDExLjA4MzMgMTIuODMzNSAxMS45OTk5IDEyLjgzMzVDMTIuOTE2NiAxMi44MzM1IDEzLjgxOTQgMTIuOTQxMSAxNC43MDgzIDEzLjE1NjRDMTUuNTk3MSAxMy4zNzE3IDE2LjQ3MjEgMTMuNjk0NiAxNy4zMzMzIDE0LjEyNTJDMTcuNzM2IDE0LjMzMzUgMTguMDU4OSAxNC42MzU2IDE4LjMwMiAxNS4wMzE0QzE4LjU0NTEgMTUuNDI3MiAxOC42NjY2IDE1Ljg2MTMgMTguNjY2NiAxNi4zMzM1VjE3LjAwMDJDMTguNjY2NiAxNy40NTg1IDE4LjUwMzQgMTcuODUwOSAxOC4xNzcgMTguMTc3MkMxNy44NTA2IDE4LjUwMzYgMTcuNDU4MyAxOC42NjY4IDE2Ljk5OTkgMTguNjY2OEg2Ljk5OTkyQzYuNTQxNTkgMTguNjY2OCA2LjE0OTIyIDE4LjUwMzYgNS44MjI4NCAxOC4xNzcyQzUuNDk2NDUgMTcuODUwOSA1LjMzMzI1IDE3LjQ1ODUgNS4zMzMyNSAxNy4wMDAyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';

export const UserCell = ({ value }: CustomCellRendererProps) => {
  const styles = useStyles2(getStyles);
  const { avatar, name } = value as TeamMember;

  return (
    <div className={styles.cell}>
      <Avatar src={avatar || defaultAvatar} alt={`Avatar for the user ${name}`} width={3} height={3} /> {name}
    </div>
  );
};
