import React, { useState, useRef, useEffect } from "react";
import { Alert, Form } from "react-bootstrap";
import _ from "lodash";
import styles from "./ReactiveSearch.module.css";

const ReactiveSearch = ({
	id,
	items,
	headerLabel,
	resetOnSelect,
	selectionLabel,
	idPath = "",
	valuePath = "",
	error,
	onChange: handleItemChange,
}) => {
	const [selectedItem, setSelectedItem] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [showSearchBox, setShowSearchBox] = useState(false);
	const [focusedItemIndex, setFocusedItemIndex] = useState(-1);
	const searchContainerRef = useRef();
	const searchListRef = useRef();
	const searchInputRef = useRef();

	const handleChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleItemClick = (item) => {
		setSelectedItem(item);
		handleItemChange(_.get(item, idPath));
		setSearchTerm("");
		setShowSearchBox(false);

		if (resetOnSelect) setSelectedItem("");
	};

	const handleLabelClick = () => {
		setShowSearchBox(!showSearchBox);
	};

	const handleDocumentClick = (event) => {
		if (!searchContainerRef.current.contains(event.target)) {
			setShowSearchBox(false);
			setSearchTerm("");
		}
	};

	const handleCreateNewClick = () => {
		window.open("https://example.com/new");
	};

	const handleRefreshClick = () => {
		alert("Refresh button clicked!");
	};

	const handleInputKeyDown = (event) => {
		if (event.key === "Tab") {
			event.preventDefault();

			const newIndex =
				focusedItemIndex === -1
					? 0
					: (focusedItemIndex + (event.shiftKey ? -1 : 1)) %
					  filteredItems.length;

			setFocusedItemIndex(newIndex);

			searchListRef.current.children[newIndex]?.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		} else if (event.key === "Enter") {
			event.preventDefault();

			if (focusedItemIndex >= 0) {
				handleItemClick(filteredItems[focusedItemIndex]);
			}
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleDocumentClick);
		return () => {
			document.removeEventListener("click", handleDocumentClick);
		};
	}, []);

	useEffect(() => {
		if (showSearchBox) searchInputRef.current.focus();
	}, [showSearchBox]);

	const filteredItems = items.filter((item) =>
		_.get(item, valuePath)?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const displayLabel = _.get(selectedItem, valuePath) || selectionLabel;

	return (
		<Form.Group className="mb-3" controlId={id}>
			{headerLabel && <Form.Label>{headerLabel}</Form.Label>}
			<div className={styles.searchContainer} ref={searchContainerRef}>
				<div
					className={styles.labelContainer}
					onClick={handleLabelClick}
				>
					<span>{displayLabel}</span>
					<span className={styles.dropdownArrow} />
				</div>
				<button
					type="button"
					className={styles.refreshButton}
					onClick={handleRefreshClick}
				>
					Refresh
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
							{filteredItems.map((item, index) => (
								<li
									key={_.get(item, idPath)}
									tabIndex="0"
									className={`${styles.searchListItem} ${
										index === focusedItemIndex
											? styles.focusedItem
											: ""
									}`}
									onClick={() => handleItemClick(item)}
								>
									{_.get(item, valuePath)}
								</li>
							))}
						</ul>
						<div
							className={`${styles.searchListItem} ${styles.createNew}`}
							onClick={handleCreateNewClick}
						>
							Create New
						</div>
					</div>
				)}
			</div>
			{error && <Alert variant="danger">{error}</Alert>}
		</Form.Group>
	);
};

export default ReactiveSearch;
