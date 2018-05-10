import React from 'react';
import { Pagination } from 'react-bootstrap';

const PostPagination = props => {
  return (
    <Pagination>
      <Pagination.First onClick={props.firstPage} />
      <Pagination.Prev onClick={props.prevPage} />

      {Number(props.currentPage) - 2 > 0
        ? <Pagination.Item onClick={() => props.toPage(props.currentPage - 2)}>
          {props.currentPage - 2}
        </Pagination.Item>
        : <Pagination.Item>
          <span style={{ visibility: 'hidden' }}>1</span>
        </Pagination.Item>
      }

      {Number(props.currentPage) - 1 > 0
        ? <Pagination.Item onClick={() => props.toPage(props.currentPage - 1)}>
          {props.currentPage - 1}
        </Pagination.Item>
        : <Pagination.Item>
          <span style={{ visibility: 'hidden' }}>1</span>
        </Pagination.Item>
      }

      <Pagination.Item active>{props.currentPage}</Pagination.Item>

      {Number(props.currentPage) + 1 <= props.totalPages
        ?
        <Pagination.Item onClick={() => props.toPage(Number(props.currentPage) + 1)}>
          {Number(props.currentPage) + 1}
        </Pagination.Item>
        : <Pagination.Item>
          <span style={{ visibility: 'hidden' }}>1</span>
        </Pagination.Item>
      }

      {Number(props.currentPage) + 2 <= props.totalPages
        ?
        <Pagination.Item onClick={() => props.toPage(Number(props.currentPage) + 2)}>
          {Number(props.currentPage) + 2}
        </Pagination.Item>
        : <Pagination.Item>
          <span style={{ visibility: 'hidden' }}>1</span>
        </Pagination.Item>
      }

      <Pagination.Next onClick={props.nextPage} />
      <Pagination.Last onClick={props.lastPage} />
    </Pagination>
  );
};

export default PostPagination;
