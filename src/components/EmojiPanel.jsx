import React, { useState } from "react";
import {
  FaSmile,
  FaUsers,
  FaUtensils,
  FaRunning,
  FaPlane,
  FaShoppingBag,
  FaHeart,
  FaFlag,
} from "react-icons/fa";
import { MdNature } from "react-icons/md";

const emojiCategories = {
  Smileys: [
    "😁",
    "😅",
    "😂",
    "🙂",
    "😉",
    "😌",
    "😍",
    "😙",
    "🤪",
    "🤨",
    "🤓",
    "😎",
    "😏",
    "😒",
    "😩",
    "😭",
    "🤬",
    "🥵",
    "🥶",
    "😓",
    "😐",
    "😑",
    "🙄",
    "🥱",
    "😴",
    "😪",
    "🤧",
    "😈",
    "💩",
    "🤡",
    "👻",
    "💀",
    "😹",
  ],
  AnimalsAndNature: [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐸",
    "🐵",
    "🐔",
    "🦖",
    "🦚",
    "🦦",
    "🦥",
    "🌵",
    "🌿",
    "🍀",
    "🌻",
    "🌈",
    "💦",
    "☔️",
    "✨",
  ],
  FoodAndDrink: [
    "🍔",
    "🍟",
    "🍤",
    "🍕",
    "🌭",
    "🍿",
    "🍩",
    "🍪",
    "🍰",
    "🍺",
    "🍷",
    "🍸",
    "🍹",
    "🧉",
    "🥤",
    "🍵",
    "☕",
    "🍼",
  ],
  Activity: [
    "⚽",
    "🏀",
    "🏈",
    "⚾",
    "🎾",
    "🏐",
    "🏉",
    "🎱",
    "🏓",
    "🏸",
    "🥊",
    "🥋",
    "🎮",
    "🕹️",
    "🎲",
    "🧩",
  ],
  TravelAndPlaces: [
    "🗿",
    "🚗",
    "🚕",
    "🚙",
    "🚌",
    "🚎",
    "🏎️",
    "🚓",
    "🚑",
    "🚒",
    "🚚",
    "🚛",
    "🚜",
    "🛴",
    "🛵",
    "🚲",
    "🛹",
  ],
  Objects: [
    "📱",
    "💻",
    "🖥️",
    "🖨️",
    "📷",
    "📹",
    "🎥",
    "🔍",
    "🔑",
    "🗝️",
    "🚪",
    "🛋️",
    "🛏️",
    "🚽",
    "🚿",
    "🛁",
  ],
  Symbols: [
    "❤️",
    "💔",
    "💕",
    "💖",
    "💗",
    "💘",
    "💙",
    "💚",
    "💛",
    "💜",
    "🖤",
    "💯",
    "💢",
    "💥",
    "💫",
    "💬",
  ],
  Flags: [
    "🏳️",
    "🏴‍☠️",
    "🏳️‍🌈",
    "🚩",
    "🏁",
    "🏴",
    "🇱🇰",
    "🇮🇳",
    "🇺🇸",
    "🇬🇧",
    "🇨🇦",
    "🇲🇽",
    "🇧🇷",
    "🇫🇷",
    "🇩🇪",
    "🇮🇹",
  ],
};

const categoryIcons = {
  Smileys: <FaSmile />,
  People: <FaUsers />,
  AnimalsAndNature: <MdNature />,
  FoodAndDrink: <FaUtensils />,
  Activity: <FaRunning />,
  TravelAndPlaces: <FaPlane />,
  Objects: <FaShoppingBag />,
  Symbols: <FaHeart />,
  Flags: <FaFlag />,
};

const EmojiPanel = ({ addEmojiToInput }) => {
  const [activeCategory, setActiveCategory] = useState("Smileys");

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="absolute bottom-16 text-center bg-white duration-100 dark:bg-slate-800 overflow-y-scroll md:overflow-hidden shadow-md rounded-lg p-2 mx-2 md:text-lg gap-2 border border-gray-200 dark:border-gray-600">
      {/* Emoji Buttons */}
      <div className="grid grid-cols-7 md:grid-cols-8 gap-2 mb-4">
        {emojiCategories[activeCategory].map((emoji, index) => (
          <button
            key={index}
            onClick={() => addEmojiToInput(emoji)}
            className="cursor-pointer"
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Category Titles */}
      <div className="flex justify-center gap-3">
        {Object.keys(emojiCategories).map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`cursor-pointer text-sm ${
              activeCategory === category
                ? "text-blue-500"
                : "text-gray-500 duration-100 dark:text-gray-400"
            }`}
          >
            {categoryIcons[category]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPanel;
