import { useState, useRef, useEffect } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { ArrowClockwise } from 'react-bootstrap-icons';
import _ from 'lodash';
import styles from './ReactiveSearch.module.css';

function ReactiveSearch({
  id,
  items,
  headerLabel,
  resetOnSelect,
  selectionLabel,
  idPath = '',
  valuePath = '',
  value,
  error,
  onRefresh: handleRefreshClick,
  onChange: handleItemChange,
  handleCreateNewClick = undefined,
}) {
  const [selectedItem, setSelectedItem] = useState(value);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1);
  const searchContainerRef = useRef();
  const searchListRef = useRef();
  const searchInputRef = useRef();

  useEffect(() => {
    setSelectedItem(value);
  }, [value]);

  useEffect(() => {
    if (items.length === 0 || !selectedItem) {
      return;
    }

    if (!items.find((i) => _.get(i, idPath) === _.get(selectedItem, idPath))) {
      setSelectedItem(null);
    }
  }, [items]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    handleItemChange(item);
    setSearchTerm('');
    setShowSearchBox(false);

    if (resetOnSelect) setSelectedItem(null);
  };

  const handleLabelClick = () => {
    setShowSearchBox(!showSearchBox);
  };

  const handleDocumentClick = (event) => {
    if (!searchContainerRef.current.contains(event.target)) {
      setShowSearchBox(false);
      setSearchTerm('');
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      const newIndex = focusedItemIndex === -1
        ? 0
        : (focusedItemIndex + (event.shiftKey ? -1 : 1)) % filteredItems.length;

      setFocusedItemIndex(newIndex);

      searchListRef.current.children[newIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    } else if (event.key === 'Enter') {
      event.preventDefault();

      if (focusedItemIndex >= 0) {
        handleItemClick(filteredItems[focusedItemIndex]);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    if (showSearchBox) searchInputRef.current.focus();
  }, [showSearchBox]);

  const filteredItems = items.filter((item) => {
    const mainValue = _.get(item, valuePath)?.toLowerCase();
    if (mainValue.includes(searchTerm.toLowerCase())) {
      return true;
    }

    // Check aliases for matches
    if (item.aliases && item.aliases.length) {
      return item.aliases.some((alias) => alias.alias.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return false;
  });

  const displayLabel = _.get(selectedItem, valuePath) || selectionLabel;

  return (
    <Form.Group className="mb-3" controlId={id}>
      {headerLabel && <Form.Label>{headerLabel}</Form.Label>}
      <div className={styles.searchContainer} ref={searchContainerRef}>
        <div className={styles.labelContainer} onClick={handleLabelClick}>
          <span>{displayLabel}</span>
          <span className={styles.dropdownArrow} />
        </div>
        <button
          type="button"
          className={`btn btn-secondary ${styles.refreshButton}`}
          onClick={handleRefreshClick}
        >
          <ArrowClockwise />
        </button>
        {showSearchBox && (
          <div className={styles.searchBox}>
            <input
              ref={searchInputRef}
              type="text"
              className={styles.searchInput}
              placeholder="Search..."
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleInputKeyDown}
            />
            <ul className={styles.searchList} ref={searchListRef}>
              {filteredItems.map((item, index) => {
                let displayValue = _.get(item, valuePath);
                if (searchTerm.length > 0) {
                  const matchedAlias = item.aliases?.find((alias) => alias.alias.toLowerCase().includes(searchTerm.toLowerCase()));

                  if (matchedAlias) {
                    displayValue = `(${matchedAlias.alias}) ${displayValue}`;
                  }
                }

                return (
                  <li
                    key={_.get(item, idPath)}
                    tabIndex="0"
                    className={`${styles.searchListItem} ${
                      index === focusedItemIndex ? styles.focusedItem : ''
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    {displayValue}
                  </li>
                );
              })}
            </ul>
            {handleCreateNewClick
            && (
              <div
                className={`${styles.searchListItem} ${styles.createNew}`}
                onClick={handleCreateNewClick}
              >
                Create New
              </div>
            ) }
          </div>
        )}
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
    </Form.Group>
  );
}

export default ReactiveSearch;
